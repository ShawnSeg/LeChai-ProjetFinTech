import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commandes } from 'src/IProduitPanier';

@Component({
  selector: 'app-commandes-details',
  templateUrl: './commandes-details.component.html',
  styleUrls: ['./commandes-details.component.scss']
})
export class CommandesDetailsComponent {

  public commande:Commandes= {id:1, image:"test.png", produitsAchetes:[  {"id":1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
                                                                                  {"id":2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
                                                                                  {"id":3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
                                                                                  {"id":4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"}], dateCreation:new Date("2023-09-29"), etat:"Livré", no_civique:84, rue:"chemin de la Topaze", ville:"Ange-Gardien", province:"Québec", code_postal:"J8L0G1"}


  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const commandeId = params['id']; // Get the 'id' parameter from the route
      // Now you can fetch the corresponding 'commande' using the 'commandeId'
      this.calculateTotalCost();
    });
  }

  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.commande.produitsAchetes!) {
      cost += (produit.cout*produit.quantite);
      for(const taxe of produit.taxes)
      {
        taxes+=taxe.montant;
        if(taxe.nom=="TPS")
        {
          totalTPS +=taxe.montant*produit.quantite
        }
        if(taxe.nom=="TVQ")
        {
          totalTVQ+=taxe.montant*produit.quantite
        }
      }
      for (const autreTaxe of produit.taxes) {
        if(autreTaxe.nom !="TVQ" && autreTaxe.nom!="TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.nom]) {
          this.aggregatedTaxes[autreTaxe.nom] = autreTaxe.montant*produit.quantite;
        } else {
          this.aggregatedTaxes[autreTaxe.nom] += autreTaxe.montant*produit.quantite;
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
    //Requête pour chercher commande
  }


}
