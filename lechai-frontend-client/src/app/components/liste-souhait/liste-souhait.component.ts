import { Component } from '@angular/core';
import { ProduitPanier } from 'src/IProduitPanier';

@Component({
  selector: 'app-liste-souhait',
  templateUrl: './liste-souhait.component.html',
  styleUrls: ['./liste-souhait.component.scss']
})
export class ListeSouhaitComponent {
  public produits$?: ProduitPanier[] =[
    {"id":1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
    {"id":2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {"id":3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {"id":4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
  ];

  public length = this.produits$?.length;

  // Function to remove a product from the array
  removeProduct(productId: number): void {
    // Find the index of the product with the given ID in the array
    const index = this.produits$?.findIndex(product => product.id === productId);

    // If the product is found (index is not -1), remove it from the array
    if (index !== -1&& typeof index === 'number') {
      this.produits$?.splice(index, 1);

    }
  }

  ajoutProduitPanier(productId:number):void{
    alert(productId)
    //Requête pour ajouter au panier
    //Toast "Produit ajouté au panier avec succès!"
  }

  ajouterListePanier(){
    //Requête pour ajouter Liste au panier
    //Toast "Liste de souhait ajouté au panier avec succès!"
  }
}
