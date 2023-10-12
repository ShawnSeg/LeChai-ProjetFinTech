import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProduitPanier } from 'src/shawnInterface';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';


// Create a custom event payload object
export interface QuantityChangeEvent {
  productId: number;
  quantity: number;
}

export interface SelectedFormatChangeEvent {
  productId: number;
  formatType: String;
  selected_format:String;
}

@Component({
  selector: 'app-produit-liste-souhait',
  templateUrl: './produit-liste-souhait.component.html',
  styleUrls: ['./produit-liste-souhait.component.scss']
})
export class ProduitListeSouhaitComponent {
  @Input() produit?:ProduitPanier;
  @Output() removeProduct = new EventEmitter<number>(); // Event emitter for removing the product
  @Output() addToPanier = new EventEmitter<number>();
  @Output() changeQuantity = new EventEmitter<QuantityChangeEvent>(); // Event emitter for removing the product
  @Output() changeFormatSelected = new EventEmitter<SelectedFormatChangeEvent>(); // Event emitter for removing the product
  @ViewChild('produitaffiche', { static: true }) produitaffiche?: ElementRef;
  @ViewChild('quantiteProduit', { static: true }) quantiteProduit?: ElementRef;
  @ViewChild('formatSelected', { static: true }) formatSelected?: ElementRef;
  @ViewChild('typeFormat', { static: true }) formatTypeLabel?: ElementRef;

  selectedQuantite: number = 1; // Property to store the selected quantity
  selectedFormats: { [key: string]: number } = {}; // Property to store selected format values

  constructor(private routingService:RoutingService, private toast:ToastService){

  }

  erase(){
    if(confirm("Voulez-vous vraiment enlever ce produit de votre liste de souhait?"))
    {
      alert(this.produit?.id)
      this.removeProduct.emit(this.produit?.id||0);
    }
  }

  addProduitPanier(){
    let formatsChoisi:number[]=[]
    for(let key in this.selectedFormats)
    {
      formatsChoisi.push(this.selectedFormats[key])
    }
    this.routingService.postProduitDansPanier(this.produit!.id, this.selectedQuantite, formatsChoisi).subscribe({
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
  changeProductQuantity():void{
    const quantiteProduit = this.quantiteProduit?.nativeElement as HTMLInputElement;
    let quantite = quantiteProduit.value
    let quantiteNew = parseInt(quantite)
    alert(quantiteNew)
    this.routingService.updateChangementQuantiteProduitPanier(this.produit!.id, quantiteNew).subscribe({
      next:(data:any)=>
      {
        this.changeQuantity.emit({ productId: this.produit?.id || 0, quantity: quantiteNew || 0 }); // Pass the product ID to the parent
      },
      error:(error:HttpErrorResponse)=>{
        this.toast.showToast("error", "Erreur, Veuillez réessayer plus tard...", "bottom-center", 4000)
      }
    })

  }
  changeProductFormatSelected(value:String, format:String)
  {

    const formatSelected = this.formatSelected?.nativeElement as HTMLSelectElement;
    const typeFormat = this.formatTypeLabel?.nativeElement as HTMLElement;

    this.routingService.updateChangementFormatChoisiProduitPanier(this.produit!.id, format, value).subscribe({
      next:(data:any)=>
      {
        console.log(value)
        console.log(format)
      },
      error:(error:HttpErrorResponse)=>{
        this.toast.showToast("error", "Erreur, Veuillez réessayer plus tard...", "bottom-center", 4000)
      }
    })




  }
}
