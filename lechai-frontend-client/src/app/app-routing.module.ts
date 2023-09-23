import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PanierComponent } from './panier/panier.component';
import { ListeSouhaitComponent } from './liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './commandes-details/commandes-details.component';

const routes: Routes = [
  {path: 'panier', component:PanierComponent},
  {path: "listeSouhait", component:ListeSouhaitComponent},
  {path: "commandeDetail", component:CommandesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
