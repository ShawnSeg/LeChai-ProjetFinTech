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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    CarouselAccueilComponent,
    ProduitPhareAccueilComponent,
    CarouselCollaborateurAccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
