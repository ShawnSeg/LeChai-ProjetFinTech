import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'panier', component:PanierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
