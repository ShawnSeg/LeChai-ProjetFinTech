import { Component, ViewChild, ElementRef } from '@angular/core';
import { Produit } from 'src/ameInterfaces';
import { Categorie } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-filtres-liste-de-produits',
  templateUrl: './filtres-liste-de-produits.component.html',
  styleUrls: ['./filtres-liste-de-produits.component.scss']
})
export class FiltresListeDeProduitsComponent {
  @ViewChild('filtreButton', { static: true }) filtreButton?: ElementRef;
  @ViewChild('filtreForm', { static: true }) filtreForm?: ElementRef;

  @ViewChild('filterNom', { static: true }) filterNom?: ElementRef;
  @ViewChild('filterCategorie', { static: true }) filterCategorie?: ElementRef;
  @ViewChild('filterPrixMin', { static: true }) filterPrixMin?: ElementRef;
  @ViewChild('filterPrixMax', { static: true }) filterPrixMax?: ElementRef;

  @ViewChild('filterNomMobile', { static: true }) filterNomMobile?: ElementRef;
  @ViewChild('filterCategorieMobile', { static: true }) filterCategorieMobile?: ElementRef;
  @ViewChild('filterPrixMinMobile', { static: true }) filterPrixMinMobile?: ElementRef;
  @ViewChild('filterPrixMaxMobile', { static: true }) filterPrixMaxMobile?: ElementRef;

  categories: Categorie[] = [
    {
      id:1,
      nom:'Thé'
    },
    {
      id:2,
      nom:'Marchandise'
    }
  ];

  produits: Produit[] = [
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
    },
    {
      id:2,
      image: [
        'dirtyChai/dirtyFront',
        'dirtyChai/dirtyTop',
        'dirtyChai/dirtyBottom'
      ],
      nom: 'Dirty Chai',
      icon: 'img temp/pepper.svg',
      prix: 21.00,
      quantite: 200,
      ingrediant:'The noir, cannelle, muscade, cardamome, gingembre, anis etoiler, clou girofle, piment cayenne,cafe,sucre',
      description: `C’est la version de Le Chai mélangé avec les délicieux attributs de la caféine.
      La touché caféiné développe des notes plus boisées, grillés et de cacao.
      Pourquoi pas essayer le meilleur de ces deux mondes.`,
      categorie: 1,
    },
    {
      id:3,
      image: [
        'chandail/chaiShirtFront',
        'chandail/chaiShirtBack'
      ],
      nom: 'Chandail du Chai',
      prix: 32.00,
      grandeur:[
        'S',
        'M',
        'L',
        'XL'
      ],
      couleur: [
        'Noir'
      ],
      description: `shaaiuhfkjfiuaqhuhdadh Description du chandail sdhfoidshfsoihfsiodhiodhisf`,
      categorie: 2,
    },
  ];

  public categorizedProducts: { [key: string]: Produit[] } = {};
  public filteredCategoryList:{[key:string]:Produit[]}={};

  public filteredCat:string[]=[]

  public isEmpty:boolean = false;

  public filtreNom: String = '';
  public filtreCategorie:String = '';
  public filteredProduit?: Produit[];

  constructor(private routingService:RoutingService, private toast: ToastService){

  }

  ngOnInit() {
    this.getAllProduit();
    this.filteredProduit = this.produits;
    this.groupProductsByCategory();
    this.filteredCategoryList = this.categorizedProducts;
    this.filteredCat=Object.keys(this.filteredCategoryList)
  }

  groupProductsByCategory() {
    this.categories.forEach((category) => {
      const productsInCategory = this.produits.filter((prod) => prod.categorie === category.id);
      this.categorizedProducts[category.nom] = productsInCategory;
    });
  }

  toggleButton():void{
    const filtreButton = this.filtreButton?.nativeElement as HTMLElement;
    const filtreForm = this.filtreForm?.nativeElement as HTMLElement;

    if(filtreForm.classList.contains("hide"))
      {
        filtreForm.classList.remove("hide")
      }

    if(filtreButton.classList.contains("active"))
    {

      filtreButton.classList.remove("active")
      filtreForm.classList.remove("fade-in")
      filtreForm.classList.add("fade-out")
    }
    else
    {
      filtreButton.classList.add("active")
      filtreForm.classList.remove("fade-out")
      filtreForm.classList.add("fade-in")
    }
  }

  belongsToCategorie(categorieId: number, prod:Produit): boolean {
    return prod.categorie==categorieId;
  }

  applyFilterNom(value:String) {
    this.filtreNom = value; // Store the filter value in the component property

    // Apply the filter to each category
    Object.keys(this.filteredCategoryList).forEach((categoryName) => {
      this.filteredCategoryList[categoryName] = this.filteredCategoryList[categoryName].filter((prod) => {
        return prod.nom.toLowerCase().includes(this.filtreNom.toLowerCase());
      });
    });
  }

  applyCategorieFilter(value:string){

    if (value == "tout") {

    }
    else
    {
      for (const key in this.filteredCategoryList) {
        if (this.filteredCategoryList.hasOwnProperty(key) && key !== value) {
          // Check if the category name is not equal to "Thé"
          delete this.filteredCategoryList[key]; // Remove the category
        }
      }
    }
  }



  applyAllFilters(){
    const filterNom = (this.filterNom?.nativeElement as HTMLInputElement).value;
    const filterCategorie = (this.filterCategorie?.nativeElement as HTMLSelectElement).value;
    /* const filterPrixMin = (this.filterPrixMin?.nativeElement as HTMLSelectElement).value;
    const filterPrixMax = (this.filterPrixMax?.nativeElement as HTMLSelectElement).value; */

    this.filteredCategoryList={ ...this.categorizedProducts };

    this.applyFilterNom(filterNom);
    this.applyCategorieFilter(filterCategorie);
    this.filteredCat=Object.keys(this.filteredCategoryList)
    this.NoShownProducts()
    /* this.applyFilterPrix(filterPrixMin, filterPrixMax); */
  }

  applyChangeToFormWeb(){

    /* const filterPrixMinMobile = (this.filterPrixMinMobile?.nativeElement as HTMLSelectElement).value;
    const filterPrixMaxMobile = (this.filterPrixMaxMobile?.nativeElement as HTMLSelectElement).value; */
    (this.filterNom?.nativeElement as HTMLInputElement).value = (this.filterNomMobile?.nativeElement as HTMLInputElement).value;
    (this.filterCategorie?.nativeElement as HTMLSelectElement).value = (this.filterCategorieMobile?.nativeElement as HTMLInputElement).value;
    /* (this.filterPrixMin?.nativeElement as HTMLSelectElement).value = filterPrixMinMobile;
    (this.filterPrixMax?.nativeElement as HTMLSelectElement).value = filterPrixMaxMobile; */

  }

  applyChangeToForMobile(){
    (this.filterNomMobile?.nativeElement as HTMLInputElement).value = (this.filterNom?.nativeElement as HTMLInputElement).value;
    (this.filterCategorieMobile?.nativeElement as HTMLSelectElement).value = (this.filterCategorie?.nativeElement as HTMLInputElement).value;
    /* (this.filterPrixMinMobile?.nativeElement as HTMLSelectElement).value = (this.filterPrixMin?.nativeElement as HTMLInputElement).value;
    (this.filterPrixMaxMobile?.nativeElement as HTMLSelectElement).value = (this.filterPrixMax?.nativeElement as HTMLInputElement).value; */

  }

  NoShownProducts()
  {
    this.isEmpty = Object.keys(this.filteredCategoryList).every((key) => {
      return this.filteredCategoryList[key].length === 0;
    });
  }

  getAllProduit(){
    //this.routingService.getAllProduit().subscribe(produits=>this.produits=produits)
  }

  ajoutPanier(eventData:number)
  {
    this.routingService.postProduitDansPanier(eventData).subscribe(
      (data: any) => {
        // Handle successful response here
        this.toast.showToast("success", "le produit a été ajouté au panier avec succès!", "bottom-center", 4000);

      },
      (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
        console.error('Status code:', error.status);
      }
    );
  }

  ajoutLS(eventData:number)
  {
    this.routingService.addProduitListeSouhait(eventData).subscribe(
      (data: any) => {
        // Handle successful response here
        this.toast.showToast("success", "le produit a été ajouté à la liste de souhait avec succès!", "bottom-center", 4000);

      },
      (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
        console.error('Status code:', error.status);
      }
    );
  }

}
