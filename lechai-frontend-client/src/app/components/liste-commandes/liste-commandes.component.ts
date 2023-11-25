import { Component,ViewChild, ElementRef } from '@angular/core';
import { Commandes, ProduitPanier, ProduitParCommandeInterface, Taxes } from 'src/shawnInterface';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommandeInterface } from 'src/shawnInterface';
import { Produit } from 'src/ameInterfaces';
import { concatMap, mergeMap, switchMap, filter, map} from 'rxjs/operators';
import { from } from 'rxjs';

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
 public listeCommande:CommandeInterface[] = []

  public filtreProduit: String = '';
  public filtreNumero:number = 0;
  public filtreEtat:String = "";
  public filtreDate:Date = new Date();
  public filteredCommandes?: CommandeInterface[];

  constructor(private routingService: RoutingService, private footerPosition:FooterPositionService){

  }


  ngOnInit() {
    this.getListeCommande();
    this.filteredCommandes = this.listeCommande;
    this.routingService.callRefresh();
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
          return this.isSameDate(new Date(commande.dateCreation), selectedDate);
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
    this.listeCommande = [];

    this.routingService.getListeCommandes()
      .pipe(
        mergeMap((data: CommandeInterface[]) => {
          return from(data).pipe(
            // Filter out unwanted commands (if needed)
            filter(commande => commande.EtatsCommandesID !== 4 && commande.EtatsCommandesID !== 5),
            concatMap((commande: CommandeInterface) => {
              return this.routingService.getProduitParCommandes(commande.id).pipe(
                map((data2: ProduitPanier[]) => {
                  commande.produitsAchetes = data2;
                  commande.MontantBrut = 0;
                  for (let j = 0; j < commande.produitsAchetes.length; j++) {
                    commande.MontantBrut += commande.produitsAchetes[j].cout * commande.produitsAchetes[j].quantite;
                  }
                  return commande;
                })
              );
            })
          );
        })
      )
      .subscribe((commande: CommandeInterface) => {
        // You will receive each commande with produitsAchetes set correctly.
        this.listeCommande.push(commande);
      },
      (error: HttpErrorResponse) => {
        // Handle error response here
        alert("error");
        console.error('Status code:', error.status);
      });
  }

  getProduitParCommande(commandes:CommandeInterface[])
  {




  }

  getProduitParCommande2(idCommande:number):ProduitPanier[]
  {
    let produitParCommande:ProduitPanier[] = []
    this.routingService.getProduitParCommandes(idCommande).subscribe({
      next:(data:ProduitPanier[])=>{

        return data
      }
    })
    return produitParCommande
  }
}

