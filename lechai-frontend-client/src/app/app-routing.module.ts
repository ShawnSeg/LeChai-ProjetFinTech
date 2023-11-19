import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FiltresListeDeProduitsComponent } from './components/filtres-liste-de-produits/filtres-liste-de-produits.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
import { FiltreListeCollaborateursComponent } from './components/filtre-liste-collaborateurs/filtre-liste-collaborateurs.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CompteClientComponent } from './components/compte-client/compte-client.component';
import { ModifierCompteClientComponent } from './components/modifier-compte-client/modifier-compte-client.component';
import { ContacteComponent } from './components/contacte/contacte.component';
import { PanierComponent } from './components/panier/panier.component';
import { ListeSouhaitComponent } from './components/liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './components/commandes-details/commandes-details.component';
import { ListeCommandesComponent } from './components/liste-commandes/liste-commandes.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { MdpOublierChangementComponent } from './components/mdp-oublier-changement/mdp-oublier-changement.component';
import { MdpOublierEnvoiComponent } from './components/mdp-oublier-envoi/mdp-oublier-envoi.component';
import { authGuard } from './auth.guard';
import { Page404Component } from './components/page404/page404.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';


const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'panier', component:PanierComponent, canActivate: [authGuard]},
  {path: "listeSouhait", component:ListeSouhaitComponent, canActivate: [authGuard]},
  {path: 'commandes', component: ListeCommandesComponent, canActivate: [authGuard]},
  {path: 'commandes/:id', component: CommandesDetailsComponent, canActivate: [authGuard]},
  {path: "paiement", component:PaiementComponent, canActivate: [authGuard]},
  {path: "listeProduits", component:FiltresListeDeProduitsComponent},
  {path: "listeProduits/:id_collaborateur", component:FiltresListeDeProduitsComponent},
  {path: "detailsProduit/:id", component:DetailsProduitComponent},
  {path: "listeCollaborateurs", component:FiltreListeCollaborateursComponent},
  {path: "connexion", component:ConnexionComponent},
  {path: "inscription", component:InscriptionComponent},
  {path: "compteClient", component:CompteClientComponent, canActivate: [authGuard]},
  {path: "modifierCompteClient", component:ModifierCompteClientComponent, canActivate: [authGuard]},
  {path: "nousContacter", component:ContacteComponent},
  {path: "mdpOublierChangement", component:MdpOublierChangementComponent},
  {path: "mdpOublierEnvoi", component:MdpOublierEnvoiComponent, canActivate: [authGuard]},
  {path: "checkClient", component:VerifyUserComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
