import { Component, Input } from '@angular/core';
import { ProduitPanier } from 'src/shawnInterface';

@Component({
  selector: 'app-produit-commande-detail',
  templateUrl: './produit-commande-detail.component.html',
  styleUrls: ['./produit-commande-detail.component.scss']
})
export class ProduitCommandeDetailComponent {
  @Input() produit?:ProduitPanier
}
