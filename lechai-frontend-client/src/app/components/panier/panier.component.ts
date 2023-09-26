import { Component } from '@angular/core';
import { ProduitsServiceService } from '../../services/produits-service.service';
import { ProduitPanierComponent } from '../produit-panier/produit-panier.component';
import { IProduitPanier } from 'src/IProduitPanier';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  public produits$?: Observable<IProduitPanier[]>

  constructor(private produitService: ProduitsServiceService){

  }

  ngOnInit(){
    this.produits$ = this.produitService.getProduits();
  }

  getProduitsPanier(){

  }
}
