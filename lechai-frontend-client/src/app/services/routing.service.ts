import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProduitPanier } from 'src/shawnInterface';
import { Commandes, AdresseLivraison } from 'src/shawnInterface';
import { Observable } from 'rxjs';
import {loadStripe} from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private routesPermises:String[] = []


  constructor(private http: HttpClient) { }

  //Voir avec amélie comment elle stock le id client


  getRoutesPermisesClients(): void{
    //Store les routes que les clients pourront utiliser
  }

  getProduitsPanier(): Observable<ProduitPanier[]>{
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit");
  }

  getProduitsListeSouhait(): Observable<ProduitPanier[]>{
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit");
  }

  getListeCommandes(): Observable<Commandes[]>{
    return this.http.get<Commandes[]>("https://localhost:7247/testProduit");
  }

  getCommandesDetail(commandeId:number): Observable<Commandes>{
    const appelApi = "https://localhost:7247/testProduit/"+commandeId.toString
    return this.http.get<Commandes>(appelApi);
  }

  getAdresseLivraisonPassee(): Observable<AdresseLivraison[]>{
    return this.http.get<AdresseLivraison[]>("https://localhost:7247/testProduit");
  }



  updateChangementQuantiteProduitPanier(productId:number, newQuantity:number){

    let appelApi = "https://localhost:7247/changementQuantite/"+productId.toString
    const requestBody = {
      quantity:newQuantity
    }

    return this.http.post(appelApi, requestBody)
  }

  updateChangementFormatChoisiProduitPanier(productId:number, formatChoisi:String, typeFormat:String){
    let appelApi = "https://localhost:7247/changementFormat/"+productId.toString
    const requestBody = {
      format_choisi:formatChoisi,
      type_format:typeFormat
    }

    return this.http.post(appelApi, requestBody)
  }




  postProduitDansPanier(productId: number): Observable<any> {
    // Define the URL of your backend API endpoint for adding a product to the panier
    const url = 'https://your-backend-api-url/add-product-to-panier';

    // Create a request body with the product ID to send to the backend
    const body = { productId: productId };

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body);
  }

  postListetDansPanier(liste:ProduitPanier[]){
    for(const produit of liste)
    {
      this.postProduitDansPanier(produit.id_produit)
    }

  }



  deleteProduitDePanier(productId:number){
    const url = `https://your-backend-url/delete-product/${productId}`; // Replace with your actual backend API endpoint for deleting a product
    return this.http.delete(url);
  }

  deleteProduitListeSouhait(productId:number){
    const url = `https://your-backend-url/delete-product/${productId}`; // Replace with your actual backend API endpoint for deleting a product
    return this.http.delete(url);
  }



  onCheckout(produits$:ProduitPanier[]){
    this.http.post("http://localhost:4242/checkout", {
      produits: produits$
    }).subscribe(async(res:any)=>{
      let stripe = await loadStripe("pk_test_51NuEUwHpVTFwinL2GsdbSaNKqJs9htvKjE5onIUE1uzxJeL83khsXqRaFBCEHxBUL1aiExj6bqPGFgNChGGXupWz00ZQ2fGI1Y")
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
