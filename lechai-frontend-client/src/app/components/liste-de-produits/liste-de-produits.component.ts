import { Component, Input, EventEmitter } from '@angular/core';
import { Produit } from 'src/ameInterfaces';
import { Output } from '@angular/core';


@Component({
  selector: 'app-liste-de-produits',
  templateUrl: './liste-de-produits.component.html',
  styleUrls: ['./liste-de-produits.component.scss']
})
export class ListeDeProduitsComponent {
  @Input() prod?:Produit
  @Output() panier = new EventEmitter<number>(); // Event emitter for removing the product
  @Output() listeSouhait = new EventEmitter<number>(); // Event emitter for removing the product

  currentIndex: number = 0;
  image:string = "https://localhost:7247/GetImage/"

  ngOnInit()
  {

    this.image+=this.prod?.image[0]
    console.log(this.image)
  }

  ajoutPanier()
  {
    this.panier.emit(this.prod?.id)
  }

  ajoutLS()
  {
    this.listeSouhait.emit(this.prod?.id)
  }

}

