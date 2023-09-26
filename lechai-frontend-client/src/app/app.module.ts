import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarouselAccueilComponent } from './components/accueil/carousel-accueil/carousel-accueil.component';
import { CarouselCollaborateurAccueilComponent } from './components/accueil/carousel-collaborateur-accueil/carousel-collaborateur-accueil.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProduitPanierComponent } from './components/produit-panier/produit-panier.component';
import {HttpClientModule} from '@angular/common/http';
import { IProduitPanier } from 'src/IProduitPanier';
import { ListeSouhaitComponent } from './components/liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './components/commandes-details/commandes-details.component';
import { ProduitListeSouhaitComponent } from './components/produit-liste-souhait/produit-liste-souhait.component';
import { NotreHistoireComponent } from './components/accueil/notre-histoire/notre-histoire.component';
import { ProduitCommandeDetailComponent } from './components/produit-commande-detail/produit-commande-detail.component';
import { ListeCommandesComponent } from './components/liste-commandes/liste-commandes.component';
import { CommandesListeCommandesComponent } from './components/commandes-liste-commandes/commandes-liste-commandes.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { NgxStripeModule } from 'ngx-stripe';
import { Stripe } from '@stripe/stripe-js';



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
    ListeSouhaitComponent,
    CommandesDetailsComponent,
    ProduitListeSouhaitComponent,
    NotreHistoireComponent,
    ProduitCommandeDetailComponent,
    ListeCommandesComponent,
    CommandesListeCommandesComponent,
    PaiementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStripeModule.forRoot('your_public_key_here')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
