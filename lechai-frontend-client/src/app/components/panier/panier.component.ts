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
    {"id":1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0},
    {"id":2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0},
    {"id":3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0},
    {"id":4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0},
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

  changeQuantity(eventData: { productId: number, quantity: number }) {


    // Check if this.produits$ is defined
    if (this.produits$) {
      const index = this.produits$.findIndex(product => product.id === eventData.productId);

      // If the product is found (index is not -1), update its quantity
      if (index !== -1) {
        this.produits$[index].quantite = eventData.quantity;
        this.calculateTotalCost(); // Recalculate the total cost
      }
    }
  }
  formatChange(eventData:{productId:number, formatType:String, selected_format:String})
  {
    alert(eventData.formatType+""+eventData.selected_format)
  }
// Function to remove a product from the array
removeProduct(productId: number): void {
  // Find the index of the product with the given ID in the array
  const index = this.produits$?.findIndex(product => product.id === productId);

  // If the product is found (index is not -1), remove it from the array
  if (index !== -1&& typeof index === 'number') {
    this.produits$?.splice(index, 1);
    this.calculateTotalCost(); // Recalculate the total cost
  }
}


  getProduitsPanier(){
    this.paniertService.getProduits().subscribe(produits=>this.produits$ = produits)
  }

}
