import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeInterface, Commandes, ProduitPanier } from 'src/shawnInterface';
import { RoutingService } from 'src/app/services/routing.service';
import { ToastService } from 'src/app/services/toast.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-commandes-details',
  templateUrl: './commandes-details.component.html',
  styleUrls: ['./commandes-details.component.scss']
})
export class CommandesDetailsComponent {

  public commande: CommandeInterface ={
    id:0,
    MontantBrut:0,
    produitsAchetes:[],
    dateCreation:"",
    EtatsCommandesID:0,
    no_civique:0,
    rue:"",
    ville:"",
    code_postal:"",
    numero_facture:0,
    etat:"",
    Employe:"",
    EmployeID:0,
    Client:"",
    ClientID:0,
    VilleID:0
  }



  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};


  constructor(private route: ActivatedRoute, private routingService:RoutingService, private toast:ToastService, private router:Router, private footerPosition: FooterPositionService) {}

  ngOnInit(): void {


    this.getCommandeDetail();

    this.footerPosition.setIsAbsolute(false)
  }

  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.commande.produitsAchetes) {
      cost += (produit.cout*produit.quantite);
      for(const taxe of produit.taxes)
      {
        taxes+=(taxe.Montant*produit.cout*produit.quantite);
        if(taxe.Description=="Taxes TPS")
        {
          totalTPS +=taxe.Montant*produit.quantite*produit.cout
        }
        if(taxe.Description=="Taxes TVQ")
        {
          totalTVQ+=taxe.Montant*produit.quantite*produit.cout
        }
      }
      for (const autreTaxe of produit.taxes) {
        if(autreTaxe.Description !="Taxes TVQ" && autreTaxe.Description!="Taxes TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.Description]) {
          this.aggregatedTaxes[autreTaxe.Description] = autreTaxe.Montant*produit.quantite*produit.cout;
        } else {
          this.aggregatedTaxes[autreTaxe.Description] += autreTaxe.Montant*produit.quantite*produit.cout;
        }
      }
    }



    this.coutAvantTaxes = cost;
    this.tps = totalTPS;
    this.tvq = totalTVQ;
    this.coutTotal = taxes+cost;
    this.length = Object.keys(this.aggregatedTaxes).length;
  }


  getCommandeDetail(){
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      alert(id)
      if (id) {
        // Do something with the 'courriel' parameter

        this.routingService.getCommandesDetail(id).subscribe({
          next:(data:CommandeInterface)=>{
             this.commande = data
             console.log(data)
             this.routingService.getProduitParCommandes(this.commande.id).subscribe({
              next:(data:ProduitPanier[])=>{
                console.log(data)
                this.commande.produitsAchetes=data
                console.log(this.commande)
                this.calculateTotalCost();
              }
             })

          },

          error:(error:HttpErrorResponse)=>{
            console.log(error.status)
          }
        })
      }
      else
      {
        this.toast.showToast("error", "Produit inexistant", "bottom-center", 4000);
        this.router.navigate([``]);
      }
    });

  }

}
