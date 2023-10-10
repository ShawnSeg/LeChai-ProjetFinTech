export interface TypeFormat{
  nom:string,
  format:string[],
  format_selected:string
}

export interface TypeFormatAPI{
  FormatID:number,
  Format:String,
  ProduitID:number,
  Description:string,
  TypeFormat:string
}

export interface Taxes{
  nom:string,
  montant:number
}

interface Affectations{
  ProduitID:number,
  AffectationPrixID:number,
  Description: string,
  TypeAffectation:string,
  TypeValeur:String,
  Montant:number,
}

interface AffectationsPPC{
  ProduitParCommandeID:number,
  AffectationPrixID:number,
  Description: string,
  TypeAffectation:string,
  TypeValeur:String,
  Montant:number,
}

interface Image{
  ImageID:number,
  URL:string,
  ProduitID:number,
  Description:string
}


export interface ProduitPanier{
  id_commande:number,
  id_produit:number,
  id:number,
  nom:string,
  description:string,
  quantite:number,
  quantite_restante:number,
  format:TypeFormat[],
  taxes:Taxes[],
  cout:number,
  image:String
}

export interface ProduitTestAPI{
  ID:number,
  ProduitID:number,
  CommandeID:number,
  Produit:string,
  Description:string,
  Cout:number,
  FormatChoisiID:number,
  FormatChoisiString:string,
  FormatChoisi:string,
  Quantite:number,
  QuantiteRestante:number,
  CategorieID:number,
  Categorie:string,
  EtatProduitID:number,
  EtatProduit:string
}

export interface ProduitParCommandeInterface{
  ID:number,
  ProduitID:number,
  CommandeID:number,
  Produit:string,
  Description:string,
  Cout:number,
  FormatChoisiID:number,
  FormatChoisiString:string,
  FormatChoisi:string,
  Quantite:number,
  QuantiteRestante:number,
  Taxes:AffectationsPPC[]

}

export interface ProduitInterface{
  ID:number,
  Nom:string,
  Descriptions:string,
  Ingrediants:string,
  Prix:number,
  QuantiteInventaire:number,
  CategorieID:number,
  Categorie:string,
  EtatProduitID:number,
  Images:Image[],
  Formats:TypeFormatAPI[],
  Affectations:Affectations[],

}

export interface AdresseLivraison{
  no_civique:number,
  rue:String,
  ville:String,
  province:String
}


export interface ApiResponse {
  message: string;
}

export interface ClientInterface{
  ID:number,
  Nom:string,
  Prenom:string,
  Email:string,
  DateNaissance:string,
  MDP:string,
  Token:string,
  Sel:string,
  Actif:Boolean
}

export interface Commandes{
  id:number,

  produitsAchetes:ProduitPanier[],
  dateCreation:Date,
  etat:String,
  no_civique:number,
  rue:String,
  ville:String,

  code_postal:String,
  numero_facture:number
}

export interface CommandeInterface{
  ID:number,
  NumeroFacture:number,
  MontantBrut:number,
  DateTransaction:string,
  NumeroCiviqueLivraison:number,
  RueLivraison:string,
  CodePostal:string,
  ClientID:number,
  Client:string,
  EtatsCommandesID:number,
  EtatsCommandes:string,
  VilleID:number,
  Ville:string,
  EmployeID:number,
  Employe:number
}

export interface CategoriesAPI{
  ID:number,
  Nom:string,
  Description:String,
  CategorieMereID?:number,
  CategorieMere?:String
}

