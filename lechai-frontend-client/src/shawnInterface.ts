export interface TypeFormat{
  nom:string,
  format:String[],
  format_selected:String
}

interface Taxes{
  nom:string,
  montant:number
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
  Nom:string,
  Descriptions:string,
  Ingrediants:string,
  Prix:number,
  QuantiteInventaire:number,
  CategorieID:number,
  Categorie:string,
  EtatProduitID:number,
  EtatProduit:string
}

export interface Commandes{
  id:number,
  image:String,
  produitsAchetes:ProduitPanier[],
  dateCreation:Date,
  etat:String,
  no_civique:number,
  rue:String,
  ville:String,
  province:String,
  code_postal:String
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
