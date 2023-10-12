import { HttpClient } from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { ProduitPanier } from 'src/shawnInterface';
import { AdresseLivraison } from 'src/shawnInterface';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent {

  public produits$?: ProduitPanier[] =[];

  public prenom:String = ""
  public nom:String = ""
  public no_civique:String = ""
  public rue:String = ""
  public ville:String = ""
  public province:String = ""
  public code_postal:String = ""
  public promotion:String = ""

  public promoIsValide:boolean = false;


  public adresse_livraison$:AdresseLivraison[] = [];

  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public rabais=0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};


  constructor(private http:HttpClient, private routingService: RoutingService, private toast:ToastService, private footerPosition:FooterPositionService){

  }

  ngOnInit(){
    this.calculateTotalCost();
    this.getPanier();
    this.getAdresseLivraison();
    this.footerPosition.setIsAbsolute(false)
  }


  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.produits$!) {
      cost += (produit.cout*produit.quantite);
      for(const taxe of produit.taxes)
      {
        taxes+=taxe.Montant;
        if(taxe.Description=="Taxe TPS")
        {
          totalTPS +=taxe.Montant*produit.quantite
        }
        if(taxe.Description=="Taxe TVQ")
        {
          totalTVQ+=taxe.Montant*produit.quantite
        }
      }
      for (const autreTaxe of produit.taxes) {
        if(autreTaxe.Description !="Taxe TVQ" && autreTaxe.Description!="Taxe TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.Description]) {
          this.aggregatedTaxes[autreTaxe.Description] = autreTaxe.Montant*produit.quantite;
        } else {
          this.aggregatedTaxes[autreTaxe.Description] += autreTaxe.Montant*produit.quantite;
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
    //this.routingService.getProduitsPanier().subscribe(produits=>this.produits$ = produits);
  }

  getAdresseLivraison()
  {
    this.routingService.getAdresseLivraisonPassee().subscribe(adresse_livraison=>this.adresse_livraison$ = adresse_livraison);
  }

  onCheckout():void{
    this.validerPromotion();
    if(this.validerForm())
    {
      this.routingService.onCheckout(this.produits$!)
    }
    else{
      this.toast.showToast("error", "Veuillez entrer toutes les entrées du formulaire", "bottom-center", 4000)
      this.promoIsValide = false;
    }

  }

  validerForm(){
    return (this.nom!="" && this.prenom!="" && this.no_civique!=""&& this.rue!=""&& this.ville!="" && this.code_postal!="" && this.promoIsValide)
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
}
