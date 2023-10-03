import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/ameInterfaces';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';


@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit{

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
  selectedGrandeur: string = '';
  selectedCouleur: string = '';

  constructor(private route: ActivatedRoute, private toast: ToastService, private routingService:RoutingService) { }

  ngOnInit() {
    // Récupérer le paramètre d'URL 'id'
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Convertir en nombre si nécessaire

      // Vous pouvez maintenant utiliser 'productId' dans votre composant
      console.log('ID du produit :', productId);

      // Vous pouvez charger le produit correspondant à l'aide de 'productId'
      this.produitAafficher = this.produits;
      // Par exemple, en appelant un service qui récupère les détails du produit.


      // Vérifiez si le produit a été trouvé
      if (!this.produitAafficher) {
        console.log(`Aucun produit trouvé avec l'ID ${productId}`);
      }

      this.getProduit(params['id'])
    });

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
    this.isWish = !this.isWish;
    this.isWish ? this.heartIcon = "fa-heart" : this.heartIcon = "fa-heart-o";
    this.toast.showToast("success", "Le produit à été ajouter à la liste de souhait", "bottom-center", 3000);
  }

  acheterMaintenant(): void{
    this.toast.showToast("error", "Tu achète le produit", "bottom-center", 3000);
  }

  addPanier(): void{
    this.toast.showToast("info", "Le produit à bien été ajouter au panier", "bottom-center", 3000);
  }

  getProduit(id:number){
    this.routingService.getProduitDetail(id).subscribe(produit=>this.produits=produit)
  }

}
