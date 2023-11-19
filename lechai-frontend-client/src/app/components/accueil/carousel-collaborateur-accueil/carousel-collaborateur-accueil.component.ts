import { Component } from '@angular/core';
import { Collaborateurs, CollaborateursAPI } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carousel-collaborateur-accueil',
  templateUrl: './carousel-collaborateur-accueil.component.html',
  styleUrls: ['./carousel-collaborateur-accueil.component.scss']
})
export class CarouselCollaborateurAccueilComponent {

  collaborators: Collaborateurs[] = [
    {
      id:1,
      image: 'collab1.png',
      email:"test@test.com",
      prenom:'ET Appel',
      nom: 'Maison',
      compagnie: 1,
      description: 'Description qui affiche seulement tant de caractères shkfjdshjkhskjhkjdshkjfdhkjfkjhdsfjkfdhdfgggggggggggggggggggggggggggggdsfkhsdjkhfs',
      socialLinks: [],
    },
    {
      id:2,
      image: 'prod1.png',
      prenom:'Collaborateur',
      email:"test@test.com",
      nom: '2',
      compagnie: 1,
      description: 'scription qui affiche seulement tant de caractères shkfjdshjkhsk',
      socialLinks: [],
    },
    // Ajoutez d'autres collaborateurs ici
  ];

  currentIndex: number = 0;
  intervalId: any;
  timeInterval: number = 0;

  imageFlecheGauche:string="https://localhost:7247/GetImage/imagesAutres/fleche_gauche.png"
  imageFlecheDroite:string="https://localhost:7247/GetImage/imagesAutres/fleche_droite.png"

  constructor(private routingService:RoutingService){}

  ngOnInit(): void {
    this.getCollaborateurs();

  }

  // Méthode pour changer d'image
  changeImg(increment: number): void {
    this.currentIndex = (this.currentIndex + increment + this.collaborators.length) % this.collaborators.length;
  }

  // Méthode pour démarrer le carrousel automatique
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.changeImg(1); // Change l'image automatiquement
    }, 10000);
  }

  // Méthode pour arrêter le carrousel automatique
  stopCarousel(): void {
    clearInterval(this.intervalId);
  }

  // Méthode pour gérer le clic sur la flèche gauche
  onLeftArrowClick(): void {
    this.changeImg(-1); // Change l'image vers la gauche
    this.stopCarousel();
    this.startCarousel(); // Redémarre le carrousel automatique
  }

  // Méthode pour gérer le clic sur la flèche droite
  onRightArrowClick(): void {
    this.changeImg(1); // Change l'image vers la droite
    this.stopCarousel();
    this.startCarousel(); // Redémarre le carrousel automatique
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
            socialLinks:data[i].Reseau,
            email:data[i].Email,

          }
          this.collaborators.push(collaborateur)


        }
        this.startCarousel(); // Démarre le carrousel automatique au chargement de la page
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
      }
    })

  }
  selectCollaborateur(i:number){
    this.currentIndex = i;
  }
}


