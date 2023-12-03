import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProduitPanier } from 'src/shawnInterface';

// Create a custom event payload object
export interface QuantityChangeEvent {
  productId: number;
  quantity: number;
}

export interface SelectedFormatChangeEvent {
  productId: number;

  selected_format:number;
  old_format:number
}

@Component({
  selector: 'app-produit-panier',
  templateUrl: './produit-panier.component.html',
  styleUrls: ['./produit-panier.component.scss']
})
export class ProduitPanierComponent {


  @Input() produit?: ProduitPanier;


  @Output() removeProduct = new EventEmitter<number>(); // Event emitter for removing the product
  @Output() changeQuantity = new EventEmitter<QuantityChangeEvent>(); // Event emitter for removing the product
  @Output() changeFormatSelected = new EventEmitter<SelectedFormatChangeEvent>(); // Event emitter for removing the product
  @ViewChild('produitaffiche', { static: true }) produitaffiche?: ElementRef;
  @ViewChild('quantiteProduit', { static: true }) quantiteProduit?: ElementRef;
  @ViewChild('formatSelected', { static: true }) formatSelected?: ElementRef;
  @ViewChild('typeFormat', { static: true }) formatTypeLabel?: ElementRef;


  image:string = "https://apilechai.azurewebsites.net/GetImage/"

  ngOnInit()
  {
    this.image += this.produit?.Images[0].URL||""
  }
  erase(): void {
    const produitaffiche = this.produitaffiche?.nativeElement as HTMLElement;
    if (confirm("Voulez-vous vraiment enlever ce produit du panier?")) {
      produitaffiche.classList.add("hide");
      // Emit the event to remove the product
      this.removeProduct.emit(this.produit?.id || 0); // Pass the product ID to the parent
    }
  }

  changeProductQuantity():void{
    const quantiteProduit = this.quantiteProduit?.nativeElement as HTMLInputElement;
    let quantite = quantiteProduit.value
    let quantiteNew = parseInt(quantite)

    this.changeQuantity.emit({ productId: this.produit?.id || 0, quantity: quantiteNew || 0 }); // Pass the product ID to the parent
  }
  changeProductFormatSelected(value:String, key:string,)
  {


    const formatSelected = this.formatSelected?.nativeElement as HTMLSelectElement;
    const typeFormat = this.formatTypeLabel?.nativeElement as HTMLElement;
    let oldFormat:number = 0;

    for(let i = 0; i<this.produit?.formatDict[key].length!;i++)
    {
      if(this.produit?.formatDict[key][i].format_selected == this.produit?.formatDict[key][i].Format)
      {
        oldFormat = this.produit?.formatDict[key][i].FormatID||0

      }
    }


    this.changeFormatSelected.emit({ productId: this.produit?.id || 0, selected_format: Number(value), old_format:oldFormat}); // Pass the product ID to the parent
  }

}
