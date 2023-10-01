import { HttpClient } from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { ProduitPanier } from 'src/shawnInterface';
import { AdresseLivraison } from 'src/shawnInterface';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent {

  public produits$?: ProduitPanier[] =[
    {id_commande:1, id_produit:1, id:1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:2, id:2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:3, id:3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:4, id:4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
  ];

  public adresse_livraison$:AdresseLivraison[] = [];

  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public rabais=0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};


  constructor(private http:HttpClient, private routingService: RoutingService){

  }

  ngOnInit(){
    this.calculateTotalCost();
    this.getPanier();
    this.getAdresseLivraison();
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
    this.coutTotal = taxes+cost-this.rabais;
    this.length = Object.keys(this.aggregatedTaxes).length;
  }

  getPanier()
  {
    this.routingService.getProduitsPanier().subscribe(produits=>this.produits$ = produits);
  }

  getAdresseLivraison()
  {
    this.routingService.getAdresseLivraisonPassee().subscribe(adresse_livraison=>this.adresse_livraison$ = adresse_livraison);
  }

  onCheckout():void{
    this.routingService.onCheckout(this.produits$!)
  }
}
