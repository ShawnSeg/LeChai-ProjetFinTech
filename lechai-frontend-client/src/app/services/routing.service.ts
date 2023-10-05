import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit", {headers:headers});
  }

  getProduitsListeSouhait(): Observable<ProduitPanier[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit", {headers:headers});
  }

  getAllProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>("https://localhost:7247/testProduit")
  }

  getListeCommandes(): Observable<Commandes[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commandes[]>("https://localhost:7247/testProduit", {headers:headers});
  }

  getCollaborateur():Observable<Collaborateurs[]>{
    return this.http.get<Collaborateurs[]>("https://localhost:7247/getCollaborateur");
  }

  getCommandesDetail(commandeId:number): Observable<Commandes>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const appelApi = "https://localhost:7247/testProduit/"+commandeId.toString
    return this.http.get<Commandes>(appelApi, {headers:headers});
  }

  getAdresseLivraisonPassee(): Observable<AdresseLivraison[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AdresseLivraison[]>("https://localhost:7247/testProduit", {headers:headers});
  }

  getClientInfo():Observable<Client>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Client>("https://localhost7247/getClientInfo", {headers:headers});
  }

  connexion(courriel:string, mdp:string)
  {
    const url = "https://localhost:7247/Clients/ConnexionStepOne";

    const body = {
      Email: courriel,
      Password:mdp
    }

    let token = ""

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer#`
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  checkToken(token:String){
    const url = "https://localhost:7247/Clients/ConnexionStepTwo";

    const body = {
      Token: token,

    }

    return this.http.post(url, body);
  }


  updateChangementQuantiteProduitPanier(productId:number, newQuantity:number){

    let appelApi = "https://localhost:7247/changementQuantite/"+productId.toString
    const requestBody = {
      productId:productId,
      quantity:newQuantity,
      clientId:1
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(appelApi, requestBody, {headers:headers})
  }


  updateChangementFormatChoisiProduitPanier(productId:number, formatChoisi:String, typeFormat:String){
    let appelApi = "https://localhost:7247/changementFormat/"+productId.toString
    const requestBody = {
      format_choisi:formatChoisi,
      type_format:typeFormat
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(appelApi, requestBody, {headers:headers})
  }



  postProduitDansPanier(productId: number): Observable<any> {
    // Define the URL of your backend API endpoint for adding a product to the panier
    const url = 'https://your-backend-api-url/add-product-to-panier';

    // Create a request body with the product ID to send to the backend
    const body = { productId: productId };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body,{headers:headers});
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
      newMDP:mdp
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, body, {headers:headers})
  }

  envoiCourriel(sujet:String, message:String)
  {
    const url = 'https://your-backend-api-url/envoiCourriel';

    // Create a request body with the product ID to send to the backend
    const body = { sujet:sujet, contenu:message};

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});

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

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(url,{headers:headers});
  }

  deleteProduitListeSouhait(productId:number){
    const url = `https://your-backend-url/delete-product/${productId}`; // Replace with your actual backend API endpoint for deleting a product

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(url,{headers:headers});
  }




  onCheckout(produits$:ProduitPanier[]){

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post("http://localhost:4242/checkout", {
      produits: produits$
    }, {headers:headers}).subscribe(async(res:any)=>{
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

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});
  }

  addProduitListeSouhait(produitId:number)
  {
    const url = 'https://your-backend-api-url/changemdp';

    // Create a request body with the product ID to send to the backend
    const body = { product: produitId };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});
  }
}
