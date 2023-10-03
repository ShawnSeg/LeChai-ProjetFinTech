import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProduitPanier } from 'src/shawnInterface';
import { Commandes, AdresseLivraison } from 'src/shawnInterface';
import { Observable } from 'rxjs';
import {loadStripe} from '@stripe/stripe-js';
import { ApiResponse } from 'src/shawnInterface';
import { Client } from 'src/ameInterfaces';
import { FormGroup } from '@angular/forms';
import { Produit } from 'src/ameInterfaces';
import { Collaborateurs } from 'src/ameInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private routesPermises:String[] = []


  constructor(private http: HttpClient) { }

  //Voir avec amélie comment elle stock le id client

  testAPI() {
    return this.http.get<ApiResponse>("https://localhost:7247/testProduit");
  }
  getRoutesPermisesClients(): void{
    //Store les routes que les clients pourront utiliser
  }

  getProduitDetail(produitId:number):Observable<Produit>{
    return this.http.get<Produit>("https://localhost:7247/testProduit/"+produitId.toString)
  }

  getProduitsPanier(): Observable<ProduitPanier[]>{
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit");
  }

  getProduitsListeSouhait(): Observable<ProduitPanier[]>{
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit");
  }

  getAllProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>("https://localhost:7247/testProduit")
  }

  getListeCommandes(): Observable<Commandes[]>{
    return this.http.get<Commandes[]>("https://localhost:7247/testProduit");
  }

  getCollaborateur():Observable<Collaborateurs[]>{
    return this.http.get<Collaborateurs[]>("https://localhost:7247/getCollaborateur");
  }

  getCommandesDetail(commandeId:number): Observable<Commandes>{
    const appelApi = "https://localhost:7247/testProduit/"+commandeId.toString
    return this.http.get<Commandes>(appelApi);
  }

  getAdresseLivraisonPassee(): Observable<AdresseLivraison[]>{
    return this.http.get<AdresseLivraison[]>("https://localhost:7247/testProduit");
  }

  getClientInfo():Observable<Client>{
    return this.http.get<Client>("https://localhost7247/getClientInfo/1");
  }

  connexion(courriel:String, mdp:String)
  {
    return this.http.get<String>("https://localhost7247/getClientInfo/owneiwini");
  }


  updateChangementQuantiteProduitPanier(productId:number, newQuantity:number){

    let appelApi = "https://localhost:7247/changementQuantite/"+productId.toString
    const requestBody = {
      productId:productId,
      quantity:newQuantity,
      clientId:1
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

  postChangementMDP(mdp:String)
  {
    const url ='https://your-backend-api-url/changemdp';
    const body = {
      idClient: 1,
      newMDP:mdp
    }

    return this.http.post(url, body)
  }

  envoiCourriel(sujet:String, message:String, adresseCourriel:String)
  {
    const url = 'https://your-backend-api-url/envoiCourriel';

    // Create a request body with the product ID to send to the backend
    const body = { sujet:sujet, contenu:message, courrielClient: adresseCourriel};

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body);

  }

  inscription(prenom:string, nom:string, date:Date, courrie:string, password:string){
    const url = 'https://your-backend-api-url/inscription';
    const body = {
      prenomClient:prenom,
      nomClient:nom,
      dateNaissance:date,
      adresseCourriel:courrie,
      mdp:password
    }
    return this.http.post(url, body);
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

  changeMDP(email:string){
    const url = 'https://your-backend-api-url/changemdp';

    // Create a request body with the product ID to send to the backend
    const body = { clientEmail: email };

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body);
  }
}
