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
import {HttpClientModule} from '@angular/common/http';
import { IProduitPanier } from 'src/IProduitPanier';
import { ListeSouhaitComponent } from './liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './commandes-details/commandes-details.component';
import { ProduitListeSouhaitComponent } from './produit-liste-souhait/produit-liste-souhait.component';
import { NotreHistoireComponent } from './components/accueil/notre-histoire/notre-histoire.component';
import { ProduitCommandeDetailComponent } from './produit-commande-detail/produit-commande-detail.component';
import { ListeCommandesComponent } from './liste-commandes/liste-commandes.component';
import { CommandesListeCommandesComponent } from './commandes-liste-commandes/commandes-liste-commandes.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ListeDeProduitsComponent } from './components/liste-de-produits/liste-de-produits.component';
import { FiltresListeDeProduitsComponent } from './components/filtres-liste-de-produits/filtres-liste-de-produits.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
import { FiltreListeCollaborateursComponent } from './components/filtre-liste-collaborateurs/filtre-liste-collaborateurs.component';

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
    PaiementComponent,
    ListeDeProduitsComponent,
    FiltresListeDeProduitsComponent,
    DetailsProduitComponent,
    FiltreListeCollaborateursComponent
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
