import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';

import { PanierComponent } from './components/panier/panier.component';
import { ListeSouhaitComponent } from './components/liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './components/commandes-details/commandes-details.component';
import { ListeCommandesComponent } from './components/liste-commandes/liste-commandes.component';
import { PaiementComponent } from './components/paiement/paiement.component';

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'panier', component:PanierComponent},
  {path: "listeSouhait", component:ListeSouhaitComponent},
  {path: "commandeDetail", component:CommandesDetailsComponent},
  {path: "anciennesCommandes", component:ListeCommandesComponent},
  {path: "paiement", component:PaiementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
