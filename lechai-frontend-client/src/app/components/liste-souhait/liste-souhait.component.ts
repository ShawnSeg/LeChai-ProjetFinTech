import { Component } from '@angular/core';
import { CommandeInterface, ProduitPanier, TypeFormatAPI } from 'src/shawnInterface';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { concatMap, map, concat, reduce, from, observable, of, switchMap, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-liste-souhait',
  templateUrl: './liste-souhait.component.html',
  styleUrls: ['./liste-souhait.component.scss']
})
export class ListeSouhaitComponent {
  public produits$?: ProduitPanier[] =[];

  public length = this.produits$?.length;

  constructor(private toastService:ToastService, private routingService: RoutingService, private footerPosition:FooterPositionService)
  {

  }

  ngOnInit(){
    this.getListeSouhait();
    this.routingService.callRefresh();
    if(this.length==0)
    {
      this.footerPosition.setIsAbsolute(true)
    }
    else
    {
      this.footerPosition.setIsAbsolute(false)
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
          console.log(this.length)
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



  ajouterListePanier(){
    this.routingService.postListetDansPanier(this.produits$!);
    this.toastService.showToast("success", "La liste de souhait a été ajouté au panier avec succès!", "bottom-center", 3000)
  }







getListeSouhait() {
  this.routingService.getListeSouhait()
    .pipe(
      switchMap((data: CommandeInterface[]) => {

        return this.routingService.getProduitParCommandes(data[0].id)
          .pipe(
            concatMap((produits: ProduitPanier[]) => {
              const observables = produits.map(produit => {
                return this.routingService.getFormatsProduits(produit.id_produit).pipe(
                  map((formats: TypeFormatAPI[]) => {
                    // Ensure that each product has its own formatDispo array
                    produit.formatDispo = formats; // Use spread operator to clone the array
                    return produit;
                  })
                );
              });

              // Concatenate the observables to ensure sequential execution
              return concat(...observables);
            }),
            reduce((acc: Array<ProduitPanier>, produit: ProduitPanier) => [...acc, produit], []) // Collect emitted values into an array
          );
      })
    )
    .subscribe((produits: ProduitPanier[]) => {
      for (let i = 0; i < produits.length; i++) {
        for (let j = 0; j < produits[i].format.length; j++) {
          for (let k = 0; k < produits[i].formatDispo.length; k++) {
            produits[i].formatDispo[k].format_selected = "";
            if (produits[i].format[j].TypeFormat == produits[i].formatDispo[k].TypeFormat) {
              produits[i].formatDispo[k].format_selected = produits[i].format[j].Format;
            }
          }
        }
      }
      for (let i = 0; i < produits.length; i++) {
        produits[i].formatDict = {}; // Initialize formatDict as an empty object
        for (let j = 0; j < produits[i].formatDispo.length; j++) {
          const typeFormat = produits[i].formatDispo[j].TypeFormat;
          if (produits[i].formatDict.hasOwnProperty(typeFormat)) {
            produits[i].formatDict[typeFormat].push(produits[i].formatDispo[j]);
          } else {
            produits[i].formatDict[typeFormat] = [produits[i].formatDispo[j]];
          }
        }
      }

      this.produits$ = produits; // Assign the array of produits to produits$
    },
    (error) => { // Handle the error here
      console.error('Error fetching products:', error);
    })
}

}
