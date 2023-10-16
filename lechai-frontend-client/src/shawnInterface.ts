export interface TypeFormat{
  id:number
  nom:string,
  format:string[],
  format_selected:string
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
export interface TypeFormatAPI{
  FormatID:number,
  Format:string,
  Description:string,
  TypeFormat:string,
  format_selected:string,
  type_format_selected?:string
  ProduitID?:number
}

export interface ProduitPanier{
  id_commande:number,
  id_produit:number,
  id:number,
  nom:string,
  description:string,
  quantite:number,
  quantite_restante:number,
  format:TypeFormatAPI[],
  TaxesProduit:AffectationsPPC[],
  cout:number,
  coutProduit:number,
  Images:Image[],
  formatDispo:TypeFormatAPI[],
  formatDict: { [key: string]: TypeFormatAPI[] };
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
  Produit:string,
  Description:string,
  QuantiteRestante:number,
  CommandeID:number,
  Quantite:number,

  FormatChoisiID?:number,
  FormatChoisiString?:string,
  FormatChoisi?:string,
  Cout:number,

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
  MontantBrut:number,
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
  id:number,
  numero_facture:number,
  MontantBrut:number,
  dateCreation:string,
  no_civique:number,
  rue:string,
  code_postal:string,
  ClientID:number,
  Client:string,
  EtatsCommandesID:number,
  etat:string,
  VilleID:number,
  ville:string,
  EmployeID:number,
  Employe:string,
  produitsAchetes: ProduitPanier[]
  Province?:string
}

export interface CategoriesAPI{
  ID:number,
  Nom:string,
  Description:String,
  CategorieMereID?:number,
  CategorieMere?:String
}

export interface ConnexionInterface{
  token:String,
  userID:number
}

