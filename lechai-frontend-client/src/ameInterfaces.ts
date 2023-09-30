
interface socialLinks
{
  name:string,
  url:string,
}

export interface Collaborateurs{
  id:number,
  image:string,
  prenom:string,
  nom:string,
  description:string,
  socialLinks:socialLinks[],
}

export interface Carousel{
  id:number,
  image:string,
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

export interface produit{
  id:number,
  image: string[],
  nom: string,
  icon: string,
  prix: string,
  quantité?: string,
  grandeur?:string[],
  couleur?: string[],
  ingrédiant?:string,
  description?: string,
}
