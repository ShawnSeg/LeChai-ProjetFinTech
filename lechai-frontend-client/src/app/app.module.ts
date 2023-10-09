import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarouselAccueilComponent } from './components/accueil/carousel-accueil/carousel-accueil.component';
import { CarouselCollaborateurAccueilComponent } from './components/accueil/carousel-collaborateur-accueil/carousel-collaborateur-accueil.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProduitPanierComponent } from './components/produit-panier/produit-panier.component';
import { HttpClientModule} from '@angular/common/http';
import { ListeSouhaitComponent } from './components/liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './components/commandes-details/commandes-details.component';
import { ProduitListeSouhaitComponent } from './components/produit-liste-souhait/produit-liste-souhait.component';
import { NotreHistoireComponent } from './components/accueil/notre-histoire/notre-histoire.component';
import { ListeDeProduitsComponent } from './components/liste-de-produits/liste-de-produits.component';
import { FiltresListeDeProduitsComponent } from './components/filtres-liste-de-produits/filtres-liste-de-produits.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
import { FiltreListeCollaborateursComponent } from './components/filtre-liste-collaborateurs/filtre-liste-collaborateurs.component';
import { ListeCollaborateursComponent } from './components/liste-collaborateurs/liste-collaborateurs.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CompteClientComponent } from './components/compte-client/compte-client.component';
import { ModifierCompteClientComponent } from './components/modifier-compte-client/modifier-compte-client.component';
import { ContacteComponent } from './components/contacte/contacte.component';
import { ProduitCommandeDetailComponent } from './components/produit-commande-detail/produit-commande-detail.component';
import { ListeCommandesComponent } from './components/liste-commandes/liste-commandes.component';
import { CommandesListeCommandesComponent } from './components/commandes-liste-commandes/commandes-liste-commandes.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdpOublierEnvoiComponent } from './components/mdp-oublier-envoi/mdp-oublier-envoi.component';
import { MdpOublierChangementComponent } from './components/mdp-oublier-changement/mdp-oublier-changement.component';
import { Page404Component } from './components/page404/page404.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { ConnexionService } from './services/connexion.service';





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
    FiltreListeCollaborateursComponent,
    ListeCollaborateursComponent,
    ConnexionComponent,
    InscriptionComponent,
    CompteClientComponent,
    ModifierCompteClientComponent,
    ContacteComponent,
    MdpOublierEnvoiComponent,
    MdpOublierChangementComponent,
    Page404Component,
    VerifyUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
