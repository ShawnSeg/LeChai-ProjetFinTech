import { Component } from '@angular/core';

import { ProduitPanierComponent } from '../produit-panier/produit-panier.component';
import { CommandeInterface, ProduitPanier, TypeFormatAPI } from 'src/shawnInterface';
import { Observable, catchError, concat, concatMap, filter, forkJoin, from, map, mergeMap, of, reduce } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  public produits$?: ProduitPanier[] =[
   ];

  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};


  constructor(private routingService: RoutingService, private footerPosition: FooterPositionService, private toast:ToastService, private router:Router){


  }

  ngOnInit(){
    this.getProduitPanier();
    this.routingService.callRefresh();

  }

  footerPosCheck(){
    if (this.produits$ && this.produits$.length < 1) {
      this.footerPosition.setIsAbsolute(true)
    }
    else
    {
      this.footerPosition.setIsAbsolute(false)
    }
  }


  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.produits$!) {
      cost += (produit.coutProduit*produit.quantite);
      for(const taxe of produit.TaxesProduit)
      {
        taxes+=taxe.Montant*produit.quantite*produit.coutProduit;
        if(taxe.Description=="Taxes TPS")
        {
          totalTPS +=taxe.Montant*produit.quantite*produit.coutProduit
        }
        if(taxe.Description=="Taxes TVQ")
        {
          totalTVQ+=taxe.Montant*produit.quantite*produit.coutProduit
        }
      }
      for (const autreTaxe of produit.TaxesProduit) {
        if(autreTaxe.Description !="Taxes TVQ" && autreTaxe.Description!="Taxes TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.Description]) {
          this.aggregatedTaxes[autreTaxe.Description] = autreTaxe.Montant*produit.coutProduit*produit.quantite;
        } else {
          this.aggregatedTaxes[autreTaxe.Description] += autreTaxe.Montant*produit.coutProduit*produit.quantite;
        }
      }
    }



    this.coutAvantTaxes = cost;
    this.tps = totalTPS;
    this.tvq = totalTVQ;
    this.coutTotal = taxes+cost;
    this.length = Object.keys(this.aggregatedTaxes).length;
  }

  changeQuantity(eventData: { productId: number, quantity: number }) {


    // Check if this.produits$ is defined
    if (this.produits$) {
      const index = this.produits$.findIndex(product => product.id === eventData.productId);

      // If the product is found (index is not -1), update its quantity
      if (index !== -1) {
        this.produits$[index].quantite = eventData.quantity;
        this.calculateTotalCost(); // Recalculate the total cost
        this.routingService.updateChangementQuantiteProduitPanier(eventData.productId, eventData.quantity).subscribe(
          (data: any) => {
            // Handle successful response here

            this.toast.showToast("success", "Le produit a été enlevé avec succès!", "bottom-center", 4000)
          },
          (error: HttpErrorResponse) => {
            // Handle error response here
            this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
            console.error('Status code:', error.status);
          }
        );;
      }
    }

  }


  formatChange(eventData:{productId:number, selected_format:number, old_format:number})
  {

    const product = this.produits$?.find((p) => p.id === eventData.productId);

    if (product) {
      // Find the format type within the product



        // Update the selected format for the format type
        //formatType.format_selected = eventData.selected_format;

        // Recalculate the total cost
        this.calculateTotalCost();
        this.routingService.updateChangementFormatChoisiProduitPanier(eventData.productId,eventData.selected_format, eventData.old_format).subscribe(
          (data: any) => {
            // Handle successful response here

            this.toast.showToast("success", "Le produit a été enlevé avec succès!", "bottom-center", 4000)
          },
          (error: HttpErrorResponse) => {
            // Handle error response here
            this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
            console.error('Status code:', error.status);
          }
        );;

    }

  }


  // Function to remove a product from the array
  removeProduct(productId: number): void {
    // Find the index of the product with the given ID in the array
    const index = this.produits$?.findIndex(product => product.id === productId);

    // If the product is found (index is not -1), remove it from the array
    if (index !== -1&& typeof index === 'number') {

      this.calculateTotalCost(); // Recalculate the total cost


      this.footerPosCheck();
      this.routingService.deleteProduitDePanier(productId).subscribe(
        (data: any) => {
          // Handle successful response here
          this.produits$?.splice(index, 1);
          this.calculateTotalCost(); // Recalculate the total cost
          this.toast.showToast("success", "Le produit a été enlevé avec succès!", "bottom-center", 4000)
        },
        (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Une erreur est survenue... Veuillez essayer plus tard.', "bottom-center", 4000);
          console.error('Status code:', error.status);
        }
      );
    }
  }

  confirmNavigation(): void {

    if (this.produits$ && this.produits$.length>0) {
      // User clicked "OK," proceed with navigation
      this.router.navigate(['/paiement']);
    } else {
      this.toast.showToast("error", "Le panier est vide! Il doit au moins y avoir 1 produit pour accéder au paiement!", "bottom-center", 4000)
    }
  }





  getProduitPanier() {
    this.routingService.getProduitsPanier().subscribe({
      next: (data: CommandeInterface[]) => {
        this.routingService.getProduitParCommandes(data[0].id)
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
                    this.produits$[i].formatDispo[k].format_selected=this.produits$[i].format[j].Format
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
            this.calculateTotalCost()
            this.footerPosCheck()
          });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }


}
