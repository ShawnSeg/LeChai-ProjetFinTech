import { Component, ViewChild, ElementRef } from '@angular/core';
import { Collaborateurs } from 'src/ameInterfaces';
import { Compagnie } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';

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
    {
      id:1,
      image: 'collab1.png',
      prenom:'ET Appel',
      nom: 'Maison',
      compagnie: 1,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Ultricies leo integer malesuada nunc vel risus
      commodo viverra maecenas. Nisl vel pretium lectus quam id leo in vitae. Morbi enim nunc faucibus a. Diam ut venenatis tellus
      in metus vulputate. Arcu dictum varius duis at consectetur. Lorem ipsum dolor sit amet consectetur adipiscing. Eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Etiam non quam lacus suspendisse faucibus interdum posuere lorem.`,
      socialLinks: [
        { name: 'facebook', url: 'https://www.facebook.com/' },
        { name: 'instagram', url: 'https://www.instagram.com/' }
      ],
    },
    {
      id:2,
      image: 'prod1.png',
      prenom:'Billie',
      nom: 'Lavertu',
      compagnie: 2,
      description:  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Ultricies leo integer malesuada nunc vel risus
      commodo viverra maecenas. Nisl vel pretium lectus quam id leo in vitae. Morbi enim nunc faucibus a. Diam ut venenatis tellus
      in metus vulputate. Arcu dictum varius duis at consectetur. Lorem ipsum dolor sit amet consectetur adipiscing. Eleifend quam
      adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Etiam non quam lacus suspendisse faucibus interdum posuere lorem.`,
      socialLinks: [
        { name: 'facebook', url: 'https://www.facebook.com/' },
        { name: 'instagram', url: 'https://www.instagram.com/' }
      ],
    },
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

  constructor(private routingService:RoutingService){

  }

  ngOnInit() {
    this.filteredCollabs = this.collaborators;
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
    this.routingService.getCollaborateur().subscribe(collaborateurs=>this.collaborators=collaborateurs)
  }
}

