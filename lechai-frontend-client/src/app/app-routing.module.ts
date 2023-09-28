import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { PanierComponent } from './panier/panier.component';
import { ListeSouhaitComponent } from './liste-souhait/liste-souhait.component';
import { CommandesDetailsComponent } from './commandes-details/commandes-details.component';
import { ListeCommandesComponent } from './liste-commandes/liste-commandes.component';
import { PaiementComponent } from './paiement/paiement.component';
import { FiltresListeDeProduitsComponent } from './components/filtres-liste-de-produits/filtres-liste-de-produits.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
import { FiltreListeCollaborateursComponent } from './components/filtre-liste-collaborateurs/filtre-liste-collaborateurs.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CompteClientComponent } from './components/compte-client/compte-client.component';
import { ModifierCompteClientComponent } from './components/modifier-compte-client/modifier-compte-client.component';
import { ContacteComponent } from './components/contacte/contacte.component';

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'panier', component:PanierComponent},
  {path: "listeSouhait", component:ListeSouhaitComponent},
  {path: "commandeDetail", component:CommandesDetailsComponent},
  {path: "anciennesCommandes", component:ListeCommandesComponent},
  {path: "paiement", component:PaiementComponent},
  {path: "listeProduits", component:FiltresListeDeProduitsComponent},
  {path: "detailsProduit", component:DetailsProduitComponent},
  {path: "listeCollaborateurs", component:FiltreListeCollaborateursComponent},
  {path: "connexion", component:ConnexionComponent},
  {path: "inscription", component:InscriptionComponent},
  {path: "compteClient", component:CompteClientComponent},
  {path: "modifierCompteClient", component:ModifierCompteClientComponent},
  {path: "nousContacter", component:ContacteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
