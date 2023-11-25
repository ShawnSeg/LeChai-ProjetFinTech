import { HttpClient } from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { CommandeInterface, ProduitPanier, TypeFormatAPI } from 'src/shawnInterface';
import { AdresseLivraison } from 'src/shawnInterface';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { concatMap, map, concat, reduce } from 'rxjs';
import { StripeServiceCustomService } from 'src/app/services/stripe-service-custom.service';
import { CouleursService } from 'src/app/services/couleurs.service';


interface KeyValue<K, V> {
  key: K
  value: V
}

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent {
  @ViewChild('form', { static: true }) form?: ElementRef;
  @ViewChild('villeChoisie', { static: true }) villeChoisie?: ElementRef;

  public produits$?: ProduitPanier[] =[];

  public prenom:String = ""
  public nom:String = ""
  public no_civique:String = ""
  public rue:String = ""
  public ville:KeyValue<string, string> = {key:"test", value:"test"};

  public code_postal:String = ""
  public promotion:String = ""

  public promoIsValide:boolean = false;


  public adresse_livraison$:AdresseLivraison[] = [];

  public villeDeservie:{ [id: string]: string } = {};

  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public rabais=0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};


  constructor(private http:HttpClient, private routingService: RoutingService, private toast:ToastService, private footerPosition:FooterPositionService, private stripeService: StripeServiceCustomService, private renderer:Renderer2, private couleurService:CouleursService){

  }

  ngOnInit(){

    this.calculateTotalCost();
    this.getPanier();
    this.getAdresseLivraison();
    this.footerPosition.setIsAbsolute(false)
    this.routingService.callRefresh();
    this.couleurService.onDataReady().subscribe(()=>{
      this.getCouleur()
    })
  }


  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.produits$!) {
      cost += (produit.coutProduit*produit.quantite);
      for(const taxe of produit.TaxesProduit)
      {
        taxes+=taxe.Montant*produit.quantite*produit.coutProduit;
        if(taxe.Description=="Taxes TPS")
        {
          totalTPS +=taxe.Montant*produit.quantite*produit.coutProduit
        }
        if(taxe.Description=="Taxes TVQ")
        {
          totalTVQ+=taxe.Montant*produit.quantite*produit.coutProduit
        }
      }
      for (const autreTaxe of produit.TaxesProduit) {
        if(autreTaxe.Description !="Taxes TVQ" && autreTaxe.Description!="Taxes TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.Description]) {
          this.aggregatedTaxes[autreTaxe.Description] = autreTaxe.Montant*produit.quantite*produit.coutProduit;
        } else {
          this.aggregatedTaxes[autreTaxe.Description] += autreTaxe.Montant*produit.quantite*produit.coutProduit;
        }
      }
    }



    this.coutAvantTaxes = cost;
    this.tps = totalTPS;
    this.tvq = totalTVQ;
    this.coutTotal = taxes+cost-this.rabais;
    this.length = Object.keys(this.aggregatedTaxes).length;
  }

  getPanier()
  {
    this.routingService.getProduitsPanier().subscribe({
      next: (data: CommandeInterface[]) => {
        this.routingService.getProduitParCommandes(data[0].id)
          .pipe(
            concatMap((produits: ProduitPanier[]) => {
              const observables = produits.map(produit => {
                return this.routingService.getFormatsProduits(produit.id_produit).pipe(
                  map((formats: TypeFormatAPI[]) => {
                    // Ensure that each product has its own formatDispo array
                    produit.formatDispo = formats; // Use spread operator to clone the array
                    return produit;
                  })
                );
              });

              // Concatenate the observables to ensure sequential execution
              return concat(...observables);
            }),
            reduce((acc: Array<ProduitPanier>, produit: ProduitPanier) => [...acc, produit], []) // Collect emitted values into an array
          )
          .subscribe((produits: ProduitPanier[]) => {
            this.produits$ = produits; // Assign the array of produits to produits$


            for(let i = 0; i<this.produits$.length;i++)
            {
              for(let j = 0; j<this.produits$[i].format.length;j++)
              {
                for(let k = 0; k<this.produits$[i].formatDispo.length;k++)
                {
                  this.produits$[i].formatDispo[k].format_selected=""
                  if(this.produits$[i].format[j].TypeFormat==this.produits$[i].formatDispo[k].TypeFormat)
                  {
                    this.produits$[i].formatDispo[k].format_selected=this.produits$[i].format[j].Format
                  }
                }
              }
            }
            for (let i = 0; i < this.produits$.length; i++) {
              this.produits$[i].formatDict = {}; // Initialize formatDict as an empty object
              for (let j = 0; j < this.produits$[i].formatDispo.length; j++) {


                const typeFormat = this.produits$[i].formatDispo[j].TypeFormat;
                if (this.produits$[i].formatDict.hasOwnProperty(typeFormat)) {
                  this.produits$[i].formatDict[typeFormat].push(this.produits$[i].formatDispo[j]);
                } else {
                  this.produits$[i].formatDict[typeFormat] = [this.produits$[i].formatDispo[j]];
                }
              }
            }


            this.calculateTotalCost()
            this.routingService.getVilles().subscribe({
              next:(data:{[id:string]:string})=>{
                this.villeDeservie = {}
                this.villeDeservie = data

              },
              error:(error:HttpErrorResponse)=>
              {

              }
            })
          });
      },
      error: (error) => {

      }
    });
  }

  getAdresseLivraison()
  {
    this.routingService.getAdresseLivraisonPassee().subscribe(adresse_livraison=>this.adresse_livraison$ = adresse_livraison);
  }

  onCheckout():void{
    this.validerPromotion();
    if( this.validerForm())
    {
      const villetest = (this.villeChoisie?.nativeElement as HTMLSelectElement).value;
      alert(this.no_civique)
      alert(this.rue)
      this.routingService.onCheckout(Number(this.no_civique), this.rue, Number(villetest))

    }
    else{
      this.toast.showToast("error", "Veuillez entrer toutes les entrées du formulaire", "bottom-center", 4000)
      this.promoIsValide = false;
    }

  }

  validerForm(){
    return (this.nom!="" && this.prenom!="" && this.no_civique!=""&& this.rue!="" && this.code_postal!="" && this.promoIsValide)
  }

  validerPromotion(){
    if(this.promotion != "")
    {
      this.routingService.checkPromotionPaiement(this.promotion).subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.promoIsValide = true;
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.promoIsValide = false;
          console.error('Status code:', error.status);

        }
      })
    }
    else{
      this.promoIsValide = true;
    }

  }

  getCouleur(){
    this.renderer.setStyle(this.form?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurBackForm"));

  }
}
