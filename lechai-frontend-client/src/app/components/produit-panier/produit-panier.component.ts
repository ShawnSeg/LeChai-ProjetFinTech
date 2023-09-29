import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProduitPanier } from 'src/IProduitPanier';

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
  changeProductFormatSelected(value:String, format:String)
  {
    const formatSelected = this.formatSelected?.nativeElement as HTMLSelectElement;
    const typeFormat = this.formatTypeLabel?.nativeElement as HTMLElement;





    this.changeFormatSelected.emit({ productId: this.produit?.id || 0, formatType: format, selected_format:value }); // Pass the product ID to the parent
  }

}
