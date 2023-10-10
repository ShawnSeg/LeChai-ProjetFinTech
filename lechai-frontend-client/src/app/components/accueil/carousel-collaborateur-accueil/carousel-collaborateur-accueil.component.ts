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
      prenom:'ET Appel',
      nom: 'Maison',
      compagnie: 1,
      description: 'Description qui affiche seulement tant de caractères shkfjdshjkhskjhkjdshkjfdhkjfkjhdsfjkfdhdfgggggggggggggggggggggggggggggdsfkhsdjkhfs',
      socialLinks: [
        { name: 'facebook', url: 'https://www.facebook.com/' },
        { name: 'instagram', url: 'https://www.instagram.com/' }
      ],
    },
    {
      id:2,
      image: 'prod1.png',
      prenom:'Collaborateur',
      nom: '2',
      compagnie: 1,
      description: 'scription qui affiche seulement tant de caractères shkfjdshjkhsk',
      socialLinks: [
        { name: 'facebook', url: 'https://www.facebook.com/' },
        { name: 'instagram', url: 'https://www.instagram.com/' }
      ],
    },
    // Ajoutez d'autres collaborateurs ici
  ];

  currentIndex: number = 0;
  intervalId: any;
  timeInterval: number = 0;

  constructor(private routingService:RoutingService){}

  ngOnInit(): void {
    this.getCollaborateurs();
    this.startCarousel(); // Démarre le carrousel automatique au chargement de la page
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
      next: (data: CollaborateursAPI[]) => {
        //this.collaborators=data;
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
       console.log(error.status);

      }
    });

  }
  selectCollaborateur(i:number){
    this.currentIndex = i;
  }
}


