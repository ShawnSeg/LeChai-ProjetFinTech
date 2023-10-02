import { Component, Input } from '@angular/core';
import { Produit } from 'src/ameInterfaces';

@Component({
  selector: 'app-liste-de-produits',
  templateUrl: './liste-de-produits.component.html',
  styleUrls: ['./liste-de-produits.component.scss']
})
export class ListeDeProduitsComponent {
  @Input() prod?:Produit

  currentIndex: number = 0;

}

