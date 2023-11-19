import { TypeFormatAPI } from "./shawnInterface"
interface socialLinks
{
  name:string,
  url:string,
}

export interface reseau{
  ID:number,
  Nom:string
}

export interface CompagniesAPI{
  ID:number,
  Nom:string,
  Telephone:string,
  AdresseCourriel:string,
  Contact:string
}

export interface Collaborateurs{
  id:number,
  image:string,
  prenom:string,
  nom:string,
  compagnie:number,
  description:string,
  email:string,
  socialLinks:Reseau[],
}

export interface Reseau{
  CollaborateurID:number,
  ReseauxSociauxID:number,
  ReseauxSociauxNom:string,
  Liens:string
}

export interface CollaborateursAPI{
  ID:number,
  Nom:string,
  Prenom:string,
  Telephone:string,
  Email:string,
  Image:string,
  CompagnieID:number,
  Compagnie:string,
  Description:string
  Reseau:Reseau[]
}

export interface Carousel{
  ID:number,
  Lien:string,
  Nom:string,
  TypeMediaID:number,
  TypeMedia:string
}

export interface HistoireAccueil{
  id:number,
  histoire:string,
}

export interface Client{
  id:number,
  prenom:string,
  nom:string,
  naissance?:string,
  courriel:string,
  mdp:string,
  civic?:number,
  rue?:string,
  apt?:number,
  ville?:string,
  province?:string,
  codePostal?:string,
}

export interface Produit{
  id:number,
  image: string[],
  nom: string,
  icon?: string,
  prix: number,
  quantite?: number,
  format?:TypeFormatAPI[],
  ingrediant?:string,
  description?: string,
  categorie: number,
  video?: string,
}

export interface Compagnie{
  id:number,
  nom: string,
}

export interface Categorie{
  id:number,
  nom: string,
  nomCatMere:String
}
