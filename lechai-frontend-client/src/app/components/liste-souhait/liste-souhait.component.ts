import { Component } from '@angular/core';
import { ProduitPanier } from 'src/shawnInterface';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-liste-souhait',
  templateUrl: './liste-souhait.component.html',
  styleUrls: ['./liste-souhait.component.scss']
})
export class ListeSouhaitComponent {
  public produits$?: ProduitPanier[] =[
    {id_commande:1, id_produit:1, id:1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:2, id:2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:3, id:3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:4, id:4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
  ];

  public length = this.produits$?.length;

  constructor(private toastService:ToastService, private routingService: RoutingService, private footerPosition:FooterPositionService)
  {

  }

  ngOnInit(){
    this.getListeSouhait();
    if(this.length&& this.length>0)
    {
      this.footerPosition.setIsAbsolute(false)
    }
    else
    {
      this.footerPosition.setIsAbsolute(true)
    }
  }

  // Function to remove a product from the array
  removeProduct(productId: number): void {
    // Find the index of the product with the given ID in the array
    const index = this.produits$?.findIndex(product => product.id === productId);

    // If the product is found (index is not -1), remove it from the array
    if (index !== -1&& typeof index === 'number') {

      this.routingService.deleteProduitListeSouhait(productId).subscribe(
        (data: any) => {
          // Handle successful response here
          this.toastService.showToast("success", "le produit a été enlevé de la liste de souhait avec succès!", "bottom-center", 4000);
          this.produits$?.splice(index, 1);
          this.length = this.produits$?.length
          if(this.length&& this.length>0)
          {
            this.footerPosition.setIsAbsolute(false)
          }
          else
          {
            this.footerPosition.setIsAbsolute(true)
          }
        },
        (error: HttpErrorResponse) => {
          // Handle error response here
          this.toastService.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
          console.error('Status code:', error.status);
        }
      );

    }
  }

  ajoutProduitPanier(productId:number):void{
    this.routingService.postProduitDansPanier(productId).subscribe(
      (data: any) => {
        // Handle successful response here
        this.toastService.showToast("success", "Le produit a été ajouté au panier avec succès!", "bottom-center", 3000)

      },
      (error: HttpErrorResponse) => {
        // Handle error response here
        this.toastService.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
        console.error('Status code:', error.status);
      }
    );


  }

  ajouterListePanier(){
    this.routingService.postListetDansPanier(this.produits$!);
    this.toastService.showToast("success", "La liste de souhait a été ajouté au panier avec succès!", "bottom-center", 3000)
  }

  getListeSouhait(){
    this.routingService.getProduitsListeSouhait().subscribe(listeSouhait=>this.produits$=listeSouhait);
  }
}
