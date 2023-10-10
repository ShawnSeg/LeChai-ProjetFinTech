import { Component,ViewChild, ElementRef } from '@angular/core';
import { Commandes, ProduitPanier, ProduitParCommandeInterface, Taxes } from 'src/shawnInterface';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommandeInterface } from 'src/shawnInterface';
import { Produit } from 'src/ameInterfaces';

@Component({
  selector: 'app-liste-commandes',
  templateUrl: './liste-commandes.component.html',
  styleUrls: ['./liste-commandes.component.scss']
})
export class ListeCommandesComponent {
  @ViewChild('filtreButton', { static: true }) filtreButton?: ElementRef;
  @ViewChild('filtreForm', { static: true }) filtreForm?: ElementRef;
  @ViewChild('filterProduit', { static: true }) filterProduit?: ElementRef;
  @ViewChild('filterNumero', { static: true }) filterNumero?: ElementRef;
  @ViewChild('filterEtat', { static: true }) filterEtat?: ElementRef;
  @ViewChild('filterDate', { static: true }) filterDate?: ElementRef;
  @ViewChild('filterProduitMobile', { static: true }) filterProduitMobile?: ElementRef;
  @ViewChild('filterNumeroMobile', { static: true }) filterNumeroMobile?: ElementRef;
  @ViewChild('filterEtatMobile', { static: true }) filterEtatMobile?: ElementRef;
  @ViewChild('filterDateMobile', { static: true }) filterDateMobile?: ElementRef;


  /*public listeCommande:Commandes[] = [{id:1, image:"test.png", numero_facture:123, produitsAchetes:[
    {id_commande:1, id_produit:1, id:1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:2, id:2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:3, id:3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
    {id_commande:1, id_produit:4, id:4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
  ], dateCreation:new Date("2023-09-29"), etat:"fini", no_civique:84, rue:"chemin de la Topaze", ville:"Ange-Gardien", province:"Québec", code_postal:"J8L0G1"},

                                      {id:2, image:"test2.png", numero_facture:124, produitsAchetes:[
                                        {id_commande:1, id_produit:1, id:1, nom:"patate", "description":"C'est un légume", quantite:2, quantite_restante:10, format:[{nom:"Couleur", format:["Rouge", "Bleu"], format_selected:"Bleu"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}, {nom:"Bruh", montant:30/2}], cout:30.0, image:"test.png"},
                                        {id_commande:1, id_produit:2, id:2, nom:"tomate", "description":"C'est un fruit", quantite:1, quantite_restante:10,format:[],taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
                                        {id_commande:1, id_produit:3, id:3, nom:"Chandail", "description":"En cotton", quantite:1, quantite_restante:10,format:[{nom:"Grandeur", format:["XS", "S", "M", "L", "XL"], format_selected:"M"}, {nom:"Couleur", format:["Rouge", "Noir"], format_selected:"Noir"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
                                        {id_commande:1, id_produit:4, id:4, nom:"Chai", "description":"C'est du thé", quantite:1, quantite_restante:10,format:[{nom:"Quantite en g", format:["20", "30", "40"], format_selected:"20"}], taxes:[{nom:"TPS", montant:30*7/100},{nom:"TVQ", montant:30*8/100}], cout:30.0, image:"test.png"},
                                      ], dateCreation:new Date("2023-09-28"), etat:"en_cours", no_civique:84, rue:"chemin de la Topaze", ville:"Ange-Gardien", province:"Québec", code_postal:"J8L0G1"}]
*/
 public listeCommande:Commandes[] = []

  public filtreProduit: String = '';
  public filtreNumero:number = 0;
  public filtreEtat:String = "";
  public filtreDate:Date = new Date();
  public filteredCommandes?: Commandes[];

  constructor(private routingService: RoutingService, private footerPosition:FooterPositionService){

  }


  ngOnInit() {
    this.getListeCommande();
    this.filteredCommandes = this.listeCommande;
    this.footerPosition.setIsAbsolute(false)
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



    applyFilterDate(value: string) {
      if (value) {
        const selectedDate = new Date(value);
        this.filtreDate = selectedDate;

        // Perform filtering logic here
        const filteredCommandes = this.filteredCommandes?.filter((commande) => {
          // Check if the `dateCreation` of the `Commande` matches the selected date
          return this.isSameDate(commande.dateCreation, selectedDate);
        });

        // Update the list with filtered commandes
        this.filteredCommandes = filteredCommandes;
      } else {
        // Handle the case where the date input is empty

      }
    }

    // Helper function to compare two dates (ignores time)
    isSameDate(date1: Date, date2: Date): boolean {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }

  applyFilterEtat(value:String)
  {
    if(value == "tout")
    {

    }
    else
    {
        // Perform filtering logic here
        const filteredCommandes = this.filteredCommandes?.filter((commande) => {
            // Check if the `id` of the `Commande` matches the provided `parsedValue`
          return commande.etat === value;
          // Update the list with filtered commandes

      });
      this.filteredCommandes = filteredCommandes;
    }
  }


  applyFilterNumero(value:string)
  {
    let parsedValue = parseInt(value);
    if(value == "")
    {

    }
    else if (!isNaN(parsedValue)) {
      // Value is a valid integer
      this.filtreNumero = parsedValue;

      // Perform filtering logic here
      const filteredCommandes = this.filteredCommandes?.filter((commande) => {
        // Check if the `id` of the `Commande` matches the provided `parsedValue`
        return commande.id === parsedValue;
      });

      // Update the list with filtered commandes
      this.filteredCommandes = filteredCommandes;
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error('Invalid input for filterNumero:', value);
      // You can also display a user-friendly error message here
      // For example, set an error flag and display an error message in your template
    }
  }




  applyFilterProduit(value:String) {
    this.filtreProduit=value
    const filteredCommandes = this.filteredCommandes?.filter((commande) => {
      // Filter logic based on product name (you can modify this)
      return (
        commande.produitsAchetes.some(
          (produit) =>
            produit.nom.toLowerCase().includes(this.filtreProduit.toLowerCase())
        )
      );
    });

    // Update the list with filtered commandes
    this.filteredCommandes = filteredCommandes;
  }



  applyAllFilters(){
    const filterProduit = (this.filterProduit?.nativeElement as HTMLInputElement).value;
    const filterNumero = (this.filterNumero?.nativeElement as HTMLInputElement).value;
    const filterEtat = (this.filterEtat?.nativeElement as HTMLSelectElement).value;
    const filterDate = (this.filterDate?.nativeElement as HTMLInputElement).value;



    this.filteredCommandes=this.listeCommande

    this.applyFilterProduit(filterProduit);
    this.applyFilterNumero(filterNumero);
    this.applyFilterEtat(filterEtat);
    this.applyFilterDate(filterDate);
  }

  applyChangeToFormWeb(){
    const filterProduitMobile = (this.filterProduitMobile?.nativeElement as HTMLInputElement).value;
    const filterNumeroMobile = (this.filterNumeroMobile?.nativeElement as HTMLInputElement).value;
    const filterEtatMobile = (this.filterEtatMobile?.nativeElement as HTMLInputElement).value;
    const filterDateMobile = (this.filterDateMobile?.nativeElement as HTMLInputElement).value;

    (this.filterProduit?.nativeElement as HTMLInputElement).value = filterProduitMobile;
    (this.filterNumero?.nativeElement as HTMLInputElement).value = filterNumeroMobile;
    (this.filterEtat?.nativeElement as HTMLSelectElement).value = filterEtatMobile;
    (this.filterDate?.nativeElement as HTMLInputElement).value = filterDateMobile
  }

  applyChangeToForMobile(){
    (this.filterProduitMobile?.nativeElement as HTMLInputElement).value =(this.filterProduit?.nativeElement as HTMLInputElement).value;
    (this.filterNumeroMobile?.nativeElement as HTMLInputElement).value=(this.filterNumero?.nativeElement as HTMLInputElement).value;
    (this.filterEtatMobile?.nativeElement as HTMLInputElement).value=(this.filterEtat?.nativeElement as HTMLSelectElement).value;
    (this.filterDateMobile?.nativeElement as HTMLInputElement).value=(this.filterDate?.nativeElement as HTMLInputElement).value;


  }

  getListeCommande(){
    this.routingService.getListeCommandes().subscribe({
      next: (data: CommandeInterface[]) => {
        // Handle successful response here
        alert(data.length)



        for(let i = 0; i<data.length;i++)
        {
          let produitsParCommande:ProduitPanier[] = []
          if(data[i].EtatsCommandes!="panier" && data[i].EtatsCommandes!='souhait')
          {
            console.log(data[i].ID)
            this.routingService.getProduitParCommandes(data[i].ID).subscribe({
              next:(data2:ProduitParCommandeInterface[])=>
              {
                  let taxes:Taxes[] = []
                  for(let j = 0; i<data2[j].Taxes.length;i++)
                  {
                    let taxe:Taxes = {
                      nom:data2[i].Taxes[j].Description,
                      montant:data2[i].Taxes[j].Montant
                    }
                    taxes.push(taxe)
                  }
                  console.log(data2[i])

                  let produits:ProduitPanier={
                    id_commande:data2[i].CommandeID,
                    id_produit:data2[i].ProduitID,
                    nom:data2[i].Produit,
                    description:data2[i].Description,
                    id:data2[i].ID,
                    quantite:data2[i].Quantite,
                    quantite_restante:data2[i].QuantiteRestante,
                    cout:data2[i].Cout,
                    format:[{nom:"grandeur", format:["XS", "S"], format_selected:"XS"}],
                    taxes:taxes,
                    image:"test.com"
                  }
                  produitsParCommande.push(produits)


                  let commande:Commandes = {
                    id:data[i].ID,
                    code_postal: data[i].CodePostal,
                    dateCreation : new Date(data[i].DateTransaction.slice(0, data[i].DateTransaction.indexOf('T'))),
                    etat : data[i].EtatsCommandes,
                    no_civique : data[i].NumeroCiviqueLivraison,
                    produitsAchetes:produitsParCommande,
                    rue : data[i].RueLivraison,
                    ville : data[i].Ville,
                    numero_facture : data[i].NumeroFacture
                  }
                  this.listeCommande.push(commande)


              },
              error:(error:HttpErrorResponse)=>{
                console.log(error.status)
              }

          })
        }

        }

      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
        alert("error")
        console.error('Status code:', error.status);

      }
    });
  }
}

