import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';

import { PanierComponent } from './panier/panier.component';
import { ListeSouhaitComponent } from './liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './commandes-details/commandes-details.component';
import { ListeCommandesComponent } from './liste-commandes/liste-commandes.component';

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'panier', component:PanierComponent},
  {path: "listeSouhait", component:ListeSouhaitComponent},
  {path: "commandeDetail", component:CommandesDetailsComponent},
  {path: "anciennesCommandes", component:ListeCommandesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
