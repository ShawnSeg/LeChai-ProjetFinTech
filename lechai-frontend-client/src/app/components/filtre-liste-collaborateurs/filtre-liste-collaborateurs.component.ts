import { Component, ViewChild, ElementRef } from '@angular/core';
import { Collaborateurs, CollaborateursAPI, CompagniesAPI } from 'src/ameInterfaces';
import { Compagnie } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-filtre-liste-collaborateurs',
  templateUrl: './filtre-liste-collaborateurs.component.html',
  styleUrls: ['./filtre-liste-collaborateurs.component.scss']
})
export class FiltreListeCollaborateursComponent {

  @ViewChild('filtreButton', { static: true }) filtreButton?: ElementRef;
  @ViewChild('filtreForm', { static: true }) filtreForm?: ElementRef;

  @ViewChild('filterPrenom', { static: true }) filterPrenom?: ElementRef;
  @ViewChild('filterNom', { static: true }) filterNom?: ElementRef;
  @ViewChild('filterCompagnie', { static: true }) filterCompagnie?: ElementRef;

  @ViewChild('filterPrenomMobile', { static: true }) filterPrenomMobile?: ElementRef;
  @ViewChild('filterNomMobile', { static: true }) filterNomMobile?: ElementRef;
  @ViewChild('filterCompagnieMobile', { static: true }) filterCompagnieMobile?: ElementRef;

  collaborators: Collaborateurs[] = [

    // Ajoutez d'autres collaborateurs ici
  ];

  compagnies: Compagnie[] = [
    {
      id:1,
      nom: 'Indépendant',
    },
    {
      id:2,
      nom: 'Autre',
    },
    // Ajoutez d'autres collaborateurs ici
  ];

  public filtrePrenom: String= '';
  public filtreNom: String = '';
  public filtreCompagnie:String = '';
  public filteredCollabs?: Collaborateurs[];

  constructor(private routingService:RoutingService, private footerPosition: FooterPositionService){

  }

  ngOnInit() {
    this.getCompagnies();


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

  belongsToCompagnie(compagnieId: number): boolean {
    return this.collaborators?.some(collab => collab.compagnie === compagnieId);
  }

  applyFilterNom(valueNom: string) {

    this.filtreNom = valueNom;

    const filteredCollabs = this.filteredCollabs?.filter((collab) => {
    // Filter logic based on both first name and last name
    const prenomMatch = collab.prenom.toLowerCase().includes(this.filtreNom.toLowerCase());
    const nomMatch = collab.nom.toLowerCase().includes(this.filtreNom.toLowerCase());

    // Return true if either first name or last name matches
    return prenomMatch || nomMatch;
  });

    // Update the list with filtered commandes
    this.filteredCollabs = filteredCollabs;
  }

  applyCompagnieFilter(value:string){
    const valueInt = parseInt(value, 10);
    if (valueInt == 0) {

    }
    else
    {
      // Perform filtering logic here
      const filteredCollabs = this.filteredCollabs?.filter((collab) => {
          // Check if the `id` of the `Commande` matches the provided `parsedValue`

        return collab.compagnie === valueInt;
        // Update the list with filtered commandes

      });
      this.filteredCollabs = filteredCollabs;
    }
  }

  applyAllFilters(){
    const filterNom = (this.filterNom?.nativeElement as HTMLInputElement).value;
    const filterCompagnie = (this.filterCompagnie?.nativeElement as HTMLSelectElement).value;

    this.filteredCollabs=this.collaborators

    this.applyFilterNom(filterNom);
    this.applyCompagnieFilter(filterCompagnie);

    if(this.filteredCollabs.length==0)
    {
      this.footerPosition.setIsAbsolute(true)
    }
    else
    {
      this.footerPosition.setIsAbsolute(false)
    }
  }

  applyChangeToFormWeb(){
    const filterNomMobile = (this.filterNomMobile?.nativeElement as HTMLInputElement).value;
    const filterCompagnieMobile = (this.filterCompagnieMobile?.nativeElement as HTMLInputElement).value;

    (this.filterNom?.nativeElement as HTMLInputElement).value = filterNomMobile;
    (this.filterCompagnie?.nativeElement as HTMLSelectElement).value = filterCompagnieMobile;
  }

  applyChangeToForMobile(){
    (this.filterNomMobile?.nativeElement as HTMLInputElement).value =(this.filterNom?.nativeElement as HTMLInputElement).value;
    (this.filterCompagnieMobile?.nativeElement as HTMLInputElement).value=(this.filterCompagnie?.nativeElement as HTMLSelectElement).value;

  }
  getCollaborateurs(){
    this.routingService.getCollaborateur().subscribe({
      next:(data:CollaborateursAPI[])=>
      {
        this.collaborators=[]

        for(let i = 0; i<data.length;i++)
        {
          let collaborateur:Collaborateurs = {
            id:data[i].ID,
            image:data[i].Image,
            prenom:data[i].Prenom,
            nom:data[i].Nom,
            compagnie:data[i].CompagnieID,
            description:data[i].Description,
            socialLinks:[{name:"facebook", url:"test.com"}],
            email:data[i].Email,

          }
          this.collaborators.push(collaborateur)
          this.filteredCollabs = this.collaborators;

        }
        if(this.filteredCollabs?.length==0)
        {
          this.footerPosition.setIsAbsolute(true)
        }
        else
        {
          this.footerPosition.setIsAbsolute(false)
        }
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
      }
    })
  }
  getCompagnies(){
    this.routingService.getCompagnies().subscribe({
      next:(data:CompagniesAPI[])=>
      {
        this.compagnies=[]

        for(let i = 0; i<data.length;i++)
        {
          let compagnie:Compagnie = {
            id:data[i].ID,

            nom:data[i].Nom,

          }
          this.compagnies.push(compagnie)

        }

        this.getCollaborateurs();
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
      }
    })
  }
}

