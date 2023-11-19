import { Component, ViewChild, ElementRef } from '@angular/core';
import { Produit } from 'src/ameInterfaces';
import { Categorie } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { CategoriesAPI, ProduitInterface, ProduitTestAPI } from 'src/shawnInterface';
import { ActivatedRoute } from '@angular/router';

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
      nom:'Thé',
      nomCatMere:""
    },
    {
      id:2,
      nom:'Marchandise',
      nomCatMere:""

    }
  ];

  produits: Produit[] = [


    {
      id:3,
      image: [
        'chandail/chaiShirtFront',
        'chandail/chaiShirtBack'
      ],
      nom: 'Chandail du Chai',
      prix: 32.00,

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

  public collaborateurID:number=0

  constructor(private routingService:RoutingService, private toast: ToastService, private footerPosition:FooterPositionService, private route: ActivatedRoute){

  }

  ngOnInit() {


    this.route.params.subscribe((params) => {
      if (params['id_collaborateur']) {
        // Parameter exists, retrieve and handle it
        this.collaborateurID = params['id_collaborateur'];
        console.log('Parameter found:', this.collaborateurID);
        // Perform actions with the parameter
      } else {
        // No parameter, act normally
        console.log('No parameter found.');
        // Perform normal actions
      }
    });
    this.getAllCategorie();
    this.routingService.callRefresh();
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
      let nomCategorieMere:String = "0"
      for (const key in this.filteredCategoryList) {
        for(let i = 0; i<this.categories.length;i++)
        {
          if(key == this.categories[i].nom && this.categories[i].nomCatMere!="")
          {
            nomCategorieMere=this.categories[i].nomCatMere
          }
        }
        if (this.filteredCategoryList.hasOwnProperty(key) && key !== value && nomCategorieMere!=value) {
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
    if(this.isEmpty)
    {
      this.footerPosition.setIsAbsolute(true)
    }
    else
    {
      this.footerPosition.setIsAbsolute(false)
    }
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
    this.routingService.getAllProduit().subscribe({
      next:(data:ProduitInterface[])=>{
        this.produits=[]
        for (let i = 0; i<data.length;i++)
        {
          if(data[i].EtatProduitID!=2)
          {
            let imageProduit:string[]=[]
            for(let j = 0; j<data[i].Images.length;j++)
            {
              imageProduit.push(data[i].Images[j].URL)

            }
            let produit :Produit = {
              id:data[i].ID,
              image:imageProduit,
              nom:data[i].Nom,
              quantite:data[i].QuantiteInventaire,
              prix:data[i].Prix,
              categorie:data[i].CategorieID,
              description:data[i].Descriptions

            }

            this.produits.push(produit)
          }
        }
        this.filteredProduit = this.produits;
        this.groupProductsByCategory();

        this.filteredCategoryList = this.categorizedProducts;
        this.filteredCat=Object.keys(this.filteredCategoryList)

        if(this.filteredProduit?.length==0)
        {
          this.footerPosition.setIsAbsolute(true)
        }
        else
        {
          this.footerPosition.setIsAbsolute(false)
        }
        console.log(this.categories)
        console.log(this.produits)
        console.log(this.filteredProduit)
        console.log(this.filteredCategoryList)
        console.log(this.filteredCat)
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
        //this.toast.showToast("error", 'il n\'existe pas de compte avec ce courriel et ce mot de passe.', "bottom-center", 4000);
        console.error('Status code:', error.status);

      }
    })
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

  getAllCategorie(){
    this.routingService.getCategories().subscribe({
      next:(data:CategoriesAPI[])=>
      {

        this.categories = []
        for(let i = 0; i<data.length;i++)
        {

          let categorie:Categorie = {
            id:i+1,
            nom:data[i].Nom,
            nomCatMere:data[i].CategorieMere||""
          }
          console.log(data[i])
          this.categories.push(categorie)
        }
        if(this.collaborateurID==0)
          this.getAllProduit();
        else
          this.getProduitsCollaborateur()

      },
      error:(error:HttpErrorResponse)=>
      {
        console.log(error.status)
      }
    })
  }

  getProduitsCollaborateur()
  {
    this.routingService.getProduitsCollaborateurs(this.collaborateurID).subscribe({
      next:(data:ProduitInterface[])=>{
        this.produits=[]
        for (let i = 0; i<data.length;i++)
        {
          if(data[i].EtatProduitID!=2)
          {
            let imageProduit:string[]=[]
            for(let j = 0; j<data[i].Images.length;j++)
            {
              imageProduit.push(data[i].Images[j].URL)

            }
            let produit :Produit = {
              id:data[i].ID,
              image:imageProduit,
              nom:data[i].Nom,
              quantite:data[i].QuantiteInventaire,
              prix:data[i].Prix,
              categorie:data[i].CategorieID,
              description:data[i].Descriptions

            }

            this.produits.push(produit)
          }
        }
        this.filteredProduit = this.produits;
        this.groupProductsByCategory();

        this.filteredCategoryList = this.categorizedProducts;
        this.filteredCat=Object.keys(this.filteredCategoryList)

        if(this.filteredProduit?.length==0)
        {
          this.footerPosition.setIsAbsolute(true)
        }
        else
        {
          this.footerPosition.setIsAbsolute(false)
        }
        console.log(this.categories)
        console.log(this.produits)
        console.log(this.filteredProduit)
        console.log(this.filteredCategoryList)
        console.log(this.filteredCat)
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
      }
    })
  }

}
