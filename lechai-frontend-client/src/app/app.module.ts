import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarouselAccueilComponent } from './components/accueil/carousel-accueil/carousel-accueil.component';
import { ProduitPhareAccueilComponent } from './components/accueil/produit-phare-accueil/produit-phare-accueil.component';
import { CarouselCollaborateurAccueilComponent } from './components/accueil/carousel-collaborateur-accueil/carousel-collaborateur-accueil.component';
import { PanierComponent } from './panier/panier.component';
import { ProduitPanierComponent } from './produit-panier/produit-panier.component';
import {HttpClientModule} from '@angular/common/http';
import { IProduitPanier } from 'src/IProduitPanier';
import { ListeSouhaitComponent } from './liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './commandes-details/commandes-details.component';
import { ProduitListeSouhaitComponent } from './produit-liste-souhait/produit-liste-souhait.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    CarouselAccueilComponent,
    ProduitPhareAccueilComponent,
    CarouselCollaborateurAccueilComponent,
    PanierComponent,
    ProduitPanierComponent,
    ListeSouhaitComponent,
    CommandesDetailsComponent,
    ProduitListeSouhaitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
