import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProduitPanier } from 'src/shawnInterface';


@Component({
  selector: 'app-produit-liste-souhait',
  templateUrl: './produit-liste-souhait.component.html',
  styleUrls: ['./produit-liste-souhait.component.scss']
})
export class ProduitListeSouhaitComponent {
  @Input() produit?:ProduitPanier;
  @Output() removeProduct = new EventEmitter<number>(); // Event emitter for removing the product
  @Output() addToPanier = new EventEmitter<number>();

  erase(){
    if(confirm("Voulez-vous vraiment enlever ce produit de votre liste de souhait?"))
    {
      alert(this.produit?.id)
      this.removeProduct.emit(this.produit?.id||0);
    }
  }

  addProduitPanier(){
    this.addToPanier.emit(this.produit?.id||0)
  }
}
