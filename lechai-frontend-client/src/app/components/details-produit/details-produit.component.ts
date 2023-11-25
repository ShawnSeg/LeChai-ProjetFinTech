import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/ameInterfaces';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProduitInterface, ProduitTestAPI, TypeFormatAPI } from 'src/shawnInterface';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit{
  public testProduit?:ProduitTestAPI;
  produits: Produit=
    {
      id:1,
      image: [
        'leChai/leChaiFront',
        'leChai/leChaiTop',
        'leChai/leChaiBottom'
      ],
      nom: 'Le Chai',
      icon: 'img temp/pepper.svg',
      prix: 18.00,
      quantite: 200,
      ingrediant:'Thé noir cannelle mouscade cardamome gingenbre anis etoiler clou de girofle piment cayenne sucre',
      description: `Nôtre Chai est naître comme la meilleure solution à une forte demande de nos clients toujours à la recherche
      d’une bonne boisson plaine de réconfort.

      La principale prétention de Le Chai est de satisfaire les palais qu’on le désir de découverte,
      d’un gout authentique et d’une texture remarquable. Fait avec un mélange d’épices bien choisis et en équilibre.
      Une petite touche piquante qui ne laissera pas tes sens indifférents. Du début à la fin un réconfort dans la bouche!`,
      categorie: 1,
    };



  produitAafficher: Produit | undefined;
  currentIndex: number = 0;
  isWish: boolean = false;
  heartIcon: string = "fa-heart-o";
  formats: { [key: string]: TypeFormatAPI[] } = {};
  selectedQuantite: number = 1; // Property to store the selected quantity
  selectedFormats: { [key: string]: number } = {}; // Property to store selected format values

  constructor(private route: ActivatedRoute, private toast: ToastService, private routingService:RoutingService, private footerPosition:FooterPositionService) { }

  ngOnInit() {
    // Récupérer le paramètre d'URL 'id'
    this.formats = {};
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Convertir en nombre si nécessaire

      // Vous pouvez maintenant utiliser 'productId' dans votre composant


      // Vous pouvez charger le produit correspondant à l'aide de 'productId'

      // Par exemple, en appelant un service qui récupère les détails du produit.


      // Vérifiez si le produit a été trouvé


      this.getProduit(params['id'])
    });
    this.routingService.callRefresh();
    this.footerPosition.setIsAbsolute(false)

  }

  // Méthode pour changer d'image
  changeImg(increment: number): void {

    if(this.produitAafficher){
      this.currentIndex = (this.currentIndex + increment + this.produitAafficher.image.length) % this.produitAafficher.image.length;
    }

  }

  // Méthode pour gérer le clic sur la flèche gauche
  onLeftArrowClick(): void {
    this.changeImg(-1); // Change l'image vers la gauche
  }

  // Méthode pour gérer le clic sur la flèche droite
  onRightArrowClick(): void {
    this.changeImg(1); // Change l'image vers la droite
  }

  addWishList(): void{
    if(localStorage.getItem("token"))
    {
      let formatsChoisi:number[]=[]
      for(let key in this.selectedFormats)
      {
        formatsChoisi.push(this.selectedFormats[key])
      }

      this.routingService.postProduitDansLS(this.produits.id, this.selectedQuantite, formatsChoisi).subscribe({
        next:(data: any) => {
          // Handle successful response here
          this.toast.showToast("success", "Le produit à été ajouter à la liste de souhait", "bottom-center", 3000);


        },
        error:(error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
          console.error('Status code:', error.status);
        }
      });
    }
    else
    {
      this.toast.showToast("error", "Vous devez vous connecter afin de pouvoir ajouter un produit à votre Liste de souhait", "bottom-center", 4000)
    }

  }

  acheterMaintenant(): void{

  }

  addPanier(): void{
    if(localStorage.getItem("token"))
    {
      let formatsChoisi:number[]=[]
      for(let key in this.selectedFormats)
      {
        formatsChoisi.push(this.selectedFormats[key])
      }

      if(this.produits&& this.selectedQuantite<this.produits?.quantite!)
      {
        this.routingService.postProduitDansPanier(this.produits.id, this.selectedQuantite, formatsChoisi).subscribe({
          next:(data: any) => {
            // Handle successful response here
            this.toast.showToast("success", "le produit a été ajouté au panier avec succès!", "bottom-center", 4000);

          },
          error:(error: HttpErrorResponse) => {
            // Handle error response here
            this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
            console.error('Status code:', error.status);
          }
        });
      }
      else
      {
        this.toast.showToast("error", "Veuillez choisir une quantité plus petite ou égale à la quantité en inventaire", "bottom-center",4000)
      }
    }
    else
    {
      this.toast.showToast("error", "Vous devez vous connecter afin de pouvoir ajouter un produit à votre Panier", "bottom-center", 4000)
    }


  }

  getProduit(id:number){
    this.routingService.getProduitDetail(id).subscribe({
      next:(data:ProduitInterface)=>{


        let imageProduit:string[]=[]
        for(let j = 0; j<data.Images.length;j++)
        {
          imageProduit.push(data.Images[j].URL);

        }

        this.produits = {
          id:data.ID,
          image:imageProduit,
          nom:data.Nom,
          quantite:data.QuantiteInventaire,
          prix:data.Prix,
          categorie:data.CategorieID,
          description:data.Descriptions,
          format:data.Formats

        }
        this.produitAafficher = this.produits;

        for(let i = 0; i<this.produits.format!.length;i++)
        {
          if(this.formats.hasOwnProperty(this.produits.format![i].TypeFormat))
          {
            this.formats[this.produits.format![i].TypeFormat].push(this.produits.format![i])
          }
          else
          {
            this.formats[this.produits.format![i].TypeFormat]=[(this.produits.format![i])]
          }
        }

        for (const key of Object.keys(this.formats)) {
          this.selectedFormats[key] = this.formats[key][0].FormatID;
      }


      },
      error:(error:HttpErrorResponse)=>{

      }
    })
  }

}
