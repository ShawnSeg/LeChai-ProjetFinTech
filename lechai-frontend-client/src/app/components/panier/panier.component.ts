import { Component } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitPanierComponent } from '../produit-panier/produit-panier.component';
import { ProduitPanier } from 'src/IProduitPanier';
import { Observable } from 'rxjs';
import { ProduitsServiceService } from 'src/app/services/produits-service.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  public produits$?: ProduitPanier[] =[
    {"id":1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
    {"id":2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {"id":3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {"id":4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
  ];

  public coutAvantTaxes =0;
  public coutTotal = 0;
  public tps = 0;
  public tvq = 0;
  public length = 0

  public aggregatedTaxes: { [taxName: string]: number } = {};

  constructor(private paniertService: ProduitsServiceService, private footerPosition: FooterPositionService, private toast:ToastService){

  }

  ngOnInit(){
    this.getProduitsPanier();
    if (this.produits$ && this.produits$.length < 2) {
      this.footerPosition.setIsAbsolute(true)
    }
    else
    {
      this.footerPosition.setIsAbsolute(false)
    }
    this.calculateTotalCost();
  }


  calculateTotalCost() {
    let cost = 0;
    let taxes = 0;
    let totalTPS = 0;
    let totalTVQ = 0;
    for (const produit of this.produits$!) {
      cost += (produit.cout*produit.quantite);
      for(const taxe of produit.taxes)
      {
        taxes+=taxe.montant;
        if(taxe.nom=="TPS")
        {
          totalTPS +=taxe.montant*produit.quantite
        }
        if(taxe.nom=="TVQ")
        {
          totalTVQ+=taxe.montant*produit.quantite
        }
      }
      for (const autreTaxe of produit.taxes) {
        if(autreTaxe.nom !="TVQ" && autreTaxe.nom!="TPS")
        // Aggregate the total amount for each unique tax name
        if (!this.aggregatedTaxes[autreTaxe.nom]) {
          this.aggregatedTaxes[autreTaxe.nom] = autreTaxe.montant*produit.quantite;
        } else {
          this.aggregatedTaxes[autreTaxe.nom] += autreTaxe.montant*produit.quantite;
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
      }
    }
    if (this.produits$ && this.produits$.length < 2) {
      this.footerPosition.setIsAbsolute(true)
    }
    else{
      this.footerPosition.setIsAbsolute(false)
    }
  }


  formatChange(eventData:{productId:number, formatType:String, selected_format:String})
  {
    alert(eventData.formatType+""+eventData.selected_format)
    const product = this.produits$?.find((p) => p.id === eventData.productId);

    if (product) {
      // Find the format type within the product
      const formatType = product.format.find((ft) => ft.nom === eventData.formatType);

      if (formatType) {
        // Update the selected format for the format type
        formatType.format_selected = eventData.selected_format;

        // Recalculate the total cost
        this.calculateTotalCost();
      }
    }

  }


  // Function to remove a product from the array
  removeProduct(productId: number): void {
    // Find the index of the product with the given ID in the array
    const index = this.produits$?.findIndex(product => product.id === productId);

    // If the product is found (index is not -1), remove it from the array
    if (index !== -1&& typeof index === 'number') {
      this.produits$?.splice(index, 1);
      this.calculateTotalCost(); // Recalculate the total cost
      this.toast.showToast("success", "Le produit a été enlevé avec succès!", "bottom-center", 4000)
    }
  }


  getProduitsPanier(){
    this.paniertService.getProduits().subscribe(produits=>this.produits$ = produits)
  }

}
