interface Grandeur{
  nom:String
}

interface Couleur{
  nom:String
}

interface QuantiteG{
  quantite:number
}

interface Taxes{
  nom:string,
  montant:number
}


export interface ProduitPanier{
  id:number,
  nom:string,
  description:string,
  quantite:number,
  grandeur:Grandeur[],
  couleur:Couleur[],
  quantite_g:QuantiteG[],
  taxes:Taxes[],
  cout:number
}



