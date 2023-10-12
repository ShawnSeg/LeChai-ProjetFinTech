import { Component } from '@angular/core';
import { CommandeInterface, ProduitPanier, TypeFormatAPI } from 'src/shawnInterface';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { concatMap, map, concat, reduce } from 'rxjs';

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



  ajouterListePanier(){
    this.routingService.postListetDansPanier(this.produits$!);
    this.toastService.showToast("success", "La liste de souhait a été ajouté au panier avec succès!", "bottom-center", 3000)
  }






  getListeSouhait(){
    this.routingService.getListeSouhait().subscribe({
      next: (data: CommandeInterface) => {
        this.routingService.getProduitParCommandes(data.id)
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
          )
          .subscribe((produits: ProduitPanier[]) => {
            this.produits$ = produits; // Assign the array of produits to produits$

            for(let i = 0; i<this.produits$.length;i++)
            {
              for(let j = 0; j<this.produits$[i].format.length;j++)
              {
                for(let k = 0; k<this.produits$[i].formatDispo.length;k++)
                {
                  this.produits$[i].formatDispo[k].format_selected=""
                  if(this.produits$[i].format[j].TypeFormat==this.produits$[i].formatDispo[k].TypeFormat)
                  {
                    this.produits$[i].formatDispo[k].format_selected=this.produits$[i].format[j].format_selected
                  }
                }
              }
            }
            for (let i = 0; i < this.produits$.length; i++) {
              this.produits$[i].formatDict = {}; // Initialize formatDict as an empty object
              for (let j = 0; j < this.produits$[i].formatDispo.length; j++) {


                const typeFormat = this.produits$[i].formatDispo[j].TypeFormat;
                if (this.produits$[i].formatDict.hasOwnProperty(typeFormat)) {
                  this.produits$[i].formatDict[typeFormat].push(this.produits$[i].formatDispo[j]);
                } else {
                  this.produits$[i].formatDict[typeFormat] = [this.produits$[i].formatDispo[j]];
                }
              }
            }
            console.log(this.produits$);

          });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
