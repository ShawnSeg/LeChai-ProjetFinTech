interface TypeFormat{
  nom:string,
  format:String[],
  format_selected:String
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
  quantite_restante:number,
  format:TypeFormat[],
  taxes:Taxes[],
  cout:number
}



