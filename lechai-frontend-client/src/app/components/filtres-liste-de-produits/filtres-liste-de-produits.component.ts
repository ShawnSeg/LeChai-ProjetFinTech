import { Component, ViewChild, ElementRef } from '@angular/core';
import { Produit } from 'src/ameInterfaces';
import { Categorie } from 'src/ameInterfaces';

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

  public filtreNom: String = '';
  public filtreCategorie:String = '';
  public filtrePrixMin: number | undefined;
  public filtrePrixMax: number | undefined;
  public filteredProduit?: Produit[];


  ngOnInit() {
    this.filteredProduit = this.produits;
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

  belongsToCategorie(categorieId: number): boolean {
    return this.produits?.some(prod => prod.categorie === categorieId);
  }

  applyFilterNom(value:String) {
    this.filtreNom=value
    const filteredProduit = this.filteredProduit?.filter((prod) => {
      // Filter logic based on product name (you can modify this)
      return (
        prod.nom.toLowerCase().includes(this.filtreNom.toLowerCase())
      );
    });

    // Update the list with filtered commandes
    this.filteredProduit = filteredProduit;
  }

  applyCategorieFilter(value:string){
    const valueInt = parseInt(value, 10);
    if (valueInt == 0) {

    }
    else
    {
      // Perform filtering logic here
      const filteredProduit = this.filteredProduit?.filter((prod) => {
          // Check if the `id` of the `Commande` matches the provided `parsedValue`

        return prod.categorie === valueInt;
        // Update the list with filtered commandes

      });
      this.filteredProduit = filteredProduit;
    }
  }

 /*  applyFilterPrix(valueMinS: string, valueMaxS: string) {

    let valueMin = parseInt(valueMinS, 10);
    let valueMax = parseInt(valueMaxS, 10);
    // Appliquez ensuite le filtre de prix
    let filteredProduit = this.filteredProduit; // Initialisez la variable ici pour éviter des problèmes de portée

    if (valueMin !== undefined && valueMax !== undefined) {
      const filteredProduit = this.filteredProduit?.filter((prod) => {
        // Insérez votre logique pour comparer le prix du produit avec les valeurs minimales et maximales ici
        // Par exemple, supposons que le prix du produit est stocké dans prod.prix
        return prod.prix >= valueMin && prod.prix <= valueMax;
      });
    }

    // Mettez à jour la liste filtrée
    this.filteredProduit = filteredProduit;
  } */

  applyAllFilters(){
    const filterNom = (this.filterNom?.nativeElement as HTMLInputElement).value;
    const filterCategorie = (this.filterCategorie?.nativeElement as HTMLSelectElement).value;
    /* const filterPrixMin = (this.filterPrixMin?.nativeElement as HTMLSelectElement).value;
    const filterPrixMax = (this.filterPrixMax?.nativeElement as HTMLSelectElement).value; */

    this.filteredProduit=this.produits

    this.applyFilterNom(filterNom);
    this.applyCategorieFilter(filterCategorie);
    /* this.applyFilterPrix(filterPrixMin, filterPrixMax); */
  }

  applyChangeToFormWeb(){
    const filterNomMobile = (this.filterNomMobile?.nativeElement as HTMLInputElement).value;
    const filterCategorieMobile = (this.filterCategorieMobile?.nativeElement as HTMLInputElement).value;
    /* const filterPrixMinMobile = (this.filterPrixMinMobile?.nativeElement as HTMLSelectElement).value;
    const filterPrixMaxMobile = (this.filterPrixMaxMobile?.nativeElement as HTMLSelectElement).value; */

    (this.filterNom?.nativeElement as HTMLInputElement).value = filterNomMobile;
    (this.filterCategorie?.nativeElement as HTMLSelectElement).value = filterCategorieMobile;
    /* (this.filterPrixMin?.nativeElement as HTMLSelectElement).value = filterPrixMinMobile;
    (this.filterPrixMax?.nativeElement as HTMLSelectElement).value = filterPrixMaxMobile; */

  }

  applyChangeToForMobile(){
    (this.filterNomMobile?.nativeElement as HTMLInputElement).value = (this.filterNom?.nativeElement as HTMLInputElement).value;
    (this.filterCategorieMobile?.nativeElement as HTMLSelectElement).value = (this.filterCategorie?.nativeElement as HTMLInputElement).value;
    /* (this.filterPrixMinMobile?.nativeElement as HTMLSelectElement).value = (this.filterPrixMin?.nativeElement as HTMLInputElement).value;
    (this.filterPrixMaxMobile?.nativeElement as HTMLSelectElement).value = (this.filterPrixMax?.nativeElement as HTMLInputElement).value; */

  }

}
