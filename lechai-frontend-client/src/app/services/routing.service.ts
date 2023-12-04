import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { CategoriesAPI, ClientInterface, Couleur, ProduitPanier, TypeFormatAPI } from 'src/shawnInterface';
import { Commandes, AdresseLivraison } from 'src/shawnInterface';
import { Observable } from 'rxjs';
import {loadStripe} from '@stripe/stripe-js';
import { ApiResponse } from 'src/shawnInterface';
import { Client, Carousel, Produit, Collaborateurs, reseau, CollaborateursAPI, CompagniesAPI } from 'src/ameInterfaces';
import { CommandeInterface } from 'src/shawnInterface';
import { ProduitTestAPI, ProduitInterface, ProduitParCommandeInterface } from 'src/shawnInterface';
import { ToastService } from './toast.service';
import { Route, Router } from '@angular/router';
import { ConnexionService } from './connexion.service';
import { Stripe } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  public baseURL = "https://apilechai.azurewebsites.net";

  private routesPermises:String[] = []


  constructor(private http: HttpClient, private toast:ToastService, private route: Router, private connecter:ConnexionService) { }

  //Voir avec amélie comment elle stock le id client

  testAPI() {
    return this.http.get<ApiResponse>("https://apilechai.azurewebsites.net/testProduit");
  }
  getRoutesPermisesClients(): void{
    //Store les routes que les clients pourront utiliser
  }

  getProduitDetail(produitId:number){

    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<ProduitInterface>(this.baseURL+"/Produits/GetDetailed?ID="+produitId.toString(), httpOptions)
  }

  getFormatsProduits(idProduit:number){
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<TypeFormatAPI[]>(this.baseURL+"/formatsproduits/GetAllDetailed?ProduitID="+idProduit.toString(), httpOptions)
  }

  getCategories(){
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<CategoriesAPI[]>(this.baseURL+"/Categories/GetAllDetailed", httpOptions)
  }

  getCarousel(): Observable<Carousel[]> {
    let token = "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Carousel[]>(this.baseURL + "/Medias/GetAll", httpOptions);
  }

  getProduitsPanier(){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<CommandeInterface[]>(this.baseURL+"/Commandes/GetAllDetailed?EtatsCommandesID=4", {headers:headers});
  }

  getListeSouhait(){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<CommandeInterface[]>(this.baseURL+"/Commandes/GetAllDetailed?EtatsCommandesID=5", {headers:headers});
  }

  getProduitParCommandes(id:number){

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProduitPanier[]>(this.baseURL+"/ProduitsParCommande/GetAllDetailed?id_commande="+id.toString(), {headers:headers});
  }
  getListeCommandes(){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<CommandeInterface[]>(this.baseURL+"/Commandes/GetAll", {headers:headers});
  }

  getAllProduit(){
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<ProduitInterface[]>(this.baseURL+"/Produits/GetAllDetailed", httpOptions)
  }



  getCollaborateur(){
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<CollaborateursAPI[]>(this.baseURL+"/Collaborateurs/GetAllDetailed", httpOptions);
  }

  getCompagnies(){
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<CompagniesAPI[]>(this.baseURL+"/Compagnies/GetAll", httpOptions);
  }

  getCommandesDetail(commandeId:number){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const appelApi = this.baseURL+"/Commandes/Get?id="+commandeId.toString()
    return this.http.get<CommandeInterface>(appelApi, {headers:headers});
  }

  getAdresseLivraisonPassee(): Observable<AdresseLivraison[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AdresseLivraison[]>(this.baseURL+"/testProduit/", {headers:headers});
  }

  getClientInfo(){
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ClientInterface>(this.baseURL+"/Clients/Get", {headers:headers});
  }

  getVilles(){
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ [id: string]: string }>(this.baseURL+"/Villes/CBO", {headers:headers});
  }

  connexion(courriel:string, mdp:string)
  {
    const url = this.baseURL+"/Clients/ConnexionStepOne";

    const body = {
      Email: courriel,
      Password:mdp
    }

    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  checkToken(token:String){
    const url = this.baseURL+"/Clients/ConnexionStepTwo";

    const body = {
      Token: token,

    }

    let tokentest = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokentest}`
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  updateClientInfo(prenom:string, ){

  }

  updateChangementQuantiteProduitPanier(productId:number, newQuantity:number){

    let appelApi = this.baseURL+"/ProduitsParCommande/UPDATE"
    const requestBody = {
      id:productId,
      quantite:newQuantity,
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(appelApi, requestBody, {headers:headers})
  }


  updateChangementFormatChoisiProduitPanier(productId:number, formatChoisiNew:number, formatChoisiOld:number){

    let appelApi = this.baseURL+"/FormatsProduitsCommandes/UPDATE"
    const requestBody = {
      ProduitParCommandeID:productId,
      FormatIDNew:formatChoisiNew,
      FormatID:formatChoisiOld
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(appelApi, requestBody, {headers:headers})
  }
  postProduitDansLS(productId: number, quantite:number=1, format_choisi:number[]=[]){
    // Define the URL of your backend API endpoint for adding a product to the panier
    const url = this.baseURL+"/ProduitsParCommande/InsertWishList";

    // Create a request body with the product ID to send to the backend
    const body = {
      Token : localStorage.getItem("token"),
      id_produit : productId,
      quantite : quantite,
      FormatID : format_choisi
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body,{headers:headers});
  }
  postLSVersPanier(productId: number){
    // Define the URL of your backend API endpoint for adding a product to the panier
    const url = this.baseURL+"/ProduitsParCommande/MoveToPanier";
    // Create a request body with the product ID to send to the backend
    const body = {
      id : productId,

    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.put(url, body,{headers:headers});
  }

  postProduitDansPanier(productId: number, quantite:number=1, format_choisi:number[]=[]){
    // Define the URL of your backend API endpoint for adding a product to the panier
    const url = this.baseURL+"/ProduitsParCommande/InsertPanier";

    // Create a request body with the product ID to send to the backend
    const body = {
      Token : localStorage.getItem("token"),
      id_produit : productId,
      quantite : quantite,
      FormatID : format_choisi
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body,{headers:headers});
  }

  postListetDansPanier(liste:ProduitPanier[]){
    for(const produit of liste)
    {
      //this.postProduitDansPanier(produit.id_produit)
    }

  }




  envoiCourriel(courriel:string, sujet:String, message:String)
  {
    const url = this.baseURL+"/Clients/Contacter";

    // Create a request body with the product ID to send to the backend
    const body = {
      Email:courriel,
      Sujet:sujet,
      Contenu:message
    };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});

  }

  inscription(prenom:string, nom:string, date:Date, courrie:string, password:string){
    const url = this.baseURL+"/Clients/InscriptionClient";
    const body = {
      Prenom:prenom,
      Nom:nom,
      DateNaissance:date,
      Email:courrie,
      Password:password,
      Actif:1
    }

    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, body, httpOptions);
  }



  deleteProduitDePanier(productId:number){
    const url = this.baseURL+"/ProduitsParCommande/DeletePanier?id="+productId.toString(); // Replace with your actual backend API endpoint for deleting a product

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(url,{headers:headers});
  }

  deleteProduitListeSouhait(productId:number){
    const url = this.baseURL+"/ProduitsParCommande/DeletePanier?id="+productId.toString(); // Replace with your actual backend API endpoint for deleting a product

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(url,{headers:headers});
  }


  sessionId: string = "";



  async onCheckout(no_civiquee: number, ruee: String, villeIDe: number, code_postale:String) {

    console.log(no_civiquee, ruee, villeIDe)
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    try {
        // Make an HTTP POST request to your server to create a Checkout Session
        const response: any = await this.http.post('https://apilechai.azurewebsites.net/Commandes/CheckoutPanier', {
            no_civique: no_civiquee,
            rue: ruee,
            VilleID: villeIDe,
            code_postal:code_postale
        },{headers:headers}).toPromise();


        this.sessionId = response.id;

        // Load the Stripe library using loadStripe
        const stripe = await loadStripe("pk_test_51O1boKAHfZleTlSefhQnJ1560TcCFfAvM6FcjLWFiLJSp0JTrbU5Te0xoQ7VvjvMV6AJtxsCZaHdYj6rurxK9K0D00TxrE9Az3");

        if (stripe) {
            // Stripe is not null
            const { error } = await stripe.redirectToCheckout({
                sessionId: this.sessionId,
            });

            if (error) {
                // Handle any errors that occurred during Checkout initiation

            }
        } else {
            // Handle the case where Stripe is null

        }
    } catch (error) {
        // Handle server request errors
        console.error('Error creating Checkout Session:', error);
    }


}

/*async onCheckout(no_civique: number, rue: String, villeID: number) {

  const token = localStorage.getItem("token");
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });


  // Define the data you want to send to the server
  const requestData = {
    // Include any data needed by your server-side endpoint
    // For example, you might include the user ID, address information, etc.
    NoCiviqueLivraison: no_civique,
    RueLivraison: rue,
    VilleID: villeID
  };


  // Make the API call to your server
  this.http.post('https://apilechai.azurewebsites.net/Commandes/CheckoutPanier', requestData, { headers })
    .subscribe((response) => {
      // Handle the response from your server
      console.log(response);

      // If needed, you can also handle the Stripe Checkout response here
      // Note: The actual session creation in Stripe might be asynchronous,
      // and you may want to handle the client-side logic accordingly.
    }, (error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    });
}*/


  UpdateChangementInfoClient(prenom:string, nom:string,dateNaissance:Date,email:string, id:number){
    const url =this.baseURL+"/Clients/UPDATE";
    const body = {
      Prenom:prenom,
      Nom:nom,
      DateNaissance:dateNaissance,
      Email:email,
      ID:id
    }

    let testToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    });

    return this.http.put(url, body, {headers:headers})
  }

  postChangementMDPAuthentifier(email:String, oldMDP:String, mdp:String)
  {
    const url =this.baseURL+"/Clients/ChangePassword";
    const body = {
      Email:email,
      NewPassword:mdp,
      Password:oldMDP
    }

    let testToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    });

    return this.http.put(url, body, {headers:headers})
  }

  postChangementMDP(mdp:String, token:String)
  {
    const url =this.baseURL+"/Clients/RecuperationStepTwo";
    const body = {
      Token:token,
      NewPassword:mdp
    }

    let testToken = ""
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    });

    return this.http.post(url, body, {headers:headers})
  }

  oublieMDP(email:string){
    const url = this.baseURL+"/Clients/RecuperationStepOne";

    // Create a request body with the product ID to send to the backend
    const body = { Email: email };

    const token = ""
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});
  }

  addProduitListeSouhait(produitId:number)
  {
    const url = this.baseURL+"/checkout";

    // Create a request body with the product ID to send to the backend
    const body = { product: produitId };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});
  }

  checkPromotionPaiement(promo:String){
    const url = this.baseURL+"/checkout";

    const body = {
      Promotion: promo,
    }

    let token = localStorage.getItem("token")

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  testRecevoirAPI(){
    const url = this.baseURL+"/ReseauxSociaux/GetAll";



    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<reseau>(url, httpOptions);
  }

  refreshToken(){
    const url = this.baseURL+"/RefreshToken";

    let token = localStorage.getItem("token")
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<reseau>(url, httpOptions);
  }

  callRefresh(){
    if(localStorage.getItem("token"))
    {
      this.refreshToken().subscribe({
        next: (data: any) => {
          // Handle successful response here

          localStorage.setItem("token", data)
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          localStorage.removeItem("token")
          this.connecter.setIsAbsolute(false)
          this.route.navigate([``]);
          this.toast.showToast("error", "Vous avez été déconnecté à cause de manque d'activité. Veuillez-vous reconnecter.", "bottom-center", 4000)

        }
      })
    }
  }

  getImage(lien:string)
  {
    const url = this.baseURL+"/GetImage/"+lien;

    // Create a request body with the product ID to send to the backend
    const body = { imagePath: lien };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.get(url,{headers:headers});
  }

  getProduitsCollaborateurs(id:number)
  {
    const url = this.baseURL+"/Produits/GetallDetailed?CollaborateurID="+id.toString();

    // Create a request body with the product ID to send to the backend


    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.get<ProduitInterface[]>(url,{headers:headers});
  }

  getCouleur(){
    const url = this.baseURL+"/Couleurs/Getall";

    // Create a request body with the product ID to send to the backend


    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.get<Couleur[]>(url,{headers:headers});
  }

  putSuccess(){
    const url = this.baseURL+"/Commandes/ConfirmPayment";

    // Create a request body with the product ID to send to the backend


    const token = localStorage.getItem("token");
    alert(token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.put(url,{},{headers:headers});
  }

}
