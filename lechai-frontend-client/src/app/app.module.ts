import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarouselAccueilComponent } from './components/accueil/carousel-accueil/carousel-accueil.component';
import { CarouselCollaborateurAccueilComponent } from './components/accueil/carousel-collaborateur-accueil/carousel-collaborateur-accueil.component';
import { PanierComponent } from './panier/panier.component';
import { ProduitPanierComponent } from './produit-panier/produit-panier.component';
import { NotreHistoireComponent } from './components/accueil/notre-histoire/notre-histoire.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    CarouselAccueilComponent,
    CarouselCollaborateurAccueilComponent,
    PanierComponent,
    ProduitPanierComponent,
    NotreHistoireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
