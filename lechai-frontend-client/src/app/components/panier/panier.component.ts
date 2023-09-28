import { Component } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitPanierComponent } from '../produit-panier/produit-panier.component';
import { ProduitPanier } from 'src/IProduitPanier';
import { Observable } from 'rxjs';
import { ProduitsServiceService } from 'src/app/services/produits-service.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  public produits$?: ProduitPanier[] =[
    {"id":1, nom:"patate", "description":"C'est un légume", quantite:2, grandeur:[], couleur:[{nom:"rouge"}, {nom:"jaune"}], quantite_g:[], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0},
    {"id":2, nom:"tomate", "description":"C'est un fruit", quantite:1, grandeur:[],couleur:[], quantite_g:[], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0},
    {"id":3, nom:"Chandail", "description":"En cotton", quantite:1, grandeur:[{nom:"XS"}, {nom:"S"}, {nom:"M"}, {nom:"L"}, {nom:"XL"}],couleur:[{nom:"Noir"},{nom:"Bleu"}], quantite_g:[], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0},
    {"id":4, nom:"Chai", "description":"C'est du thé", quantite:1, grandeur:[],couleur:[], quantite_g:[{quantite:20}, {quantite:30}, {quantite:40}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0},
  ];

  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};

  constructor(private paniertService: ProduitsServiceService){

  }

  ngOnInit(){
    this.getProduitsPanier();
    this.calculateTotalCost();
  }


  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.produits$!) {
      cost += produit.cout;
      for(const taxe of produit.taxes)
      {
        taxes+=taxe.montant;
        if(taxe.nom=="TPS")
        {
          totalTPS +=taxe.montant
        }
        if(taxe.nom=="TVQ")
        {
          totalTVQ+=taxe.montant
        }
      }
      for (const autreTaxe of produit.taxes) {
        if(autreTaxe.nom !="TVQ" && autreTaxe.nom!="TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.nom]) {
          this.aggregatedTaxes[autreTaxe.nom] = autreTaxe.montant;
        } else {
          this.aggregatedTaxes[autreTaxe.nom] += autreTaxe.montant;
        }
      }
    }



    this.coutAvantTaxes = cost;
    this.tps = totalTPS;
    this.tvq = totalTVQ;
    this.coutTotal = taxes+cost;
    this.length = Object.keys(this.aggregatedTaxes).length;
  }





  getProduitsPanier(){
    this.paniertService.getProduits().subscribe(produits=>this.produits$ = produits)
  }

}
