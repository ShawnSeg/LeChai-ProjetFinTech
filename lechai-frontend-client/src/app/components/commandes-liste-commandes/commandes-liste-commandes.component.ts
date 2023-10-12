import { Component, Input } from '@angular/core';
import { CommandeInterface } from 'src/shawnInterface';


@Component({
  selector: 'app-commandes-liste-commandes',
  templateUrl: './commandes-liste-commandes.component.html',
  styleUrls: ['./commandes-liste-commandes.component.scss']
})
export class CommandesListeCommandesComponent {
  @Input() commande?:CommandeInterface

  public cout = 0;

  calculateCost(){
    for(let produit of this.commande?.produitsAchetes!)
    {
      this.cout+=produit.cout*produit.quantite
    }
  }

  ngOnInit()
  {
    this.calculateCost();
  }
}
