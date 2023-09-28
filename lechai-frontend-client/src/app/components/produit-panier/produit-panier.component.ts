import { Component, Input  } from '@angular/core';
import { ProduitPanier } from 'src/IProduitPanier';


@Component({
  selector: 'app-produit-panier',
  templateUrl: './produit-panier.component.html',
  styleUrls: ['./produit-panier.component.scss']
})
export class ProduitPanierComponent {
  @Input() produit?:ProduitPanier
}
