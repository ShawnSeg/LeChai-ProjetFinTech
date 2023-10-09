import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carousel-accueil',
  templateUrl: './carousel-accueil.component.html',
  styleUrls: ['./carousel-accueil.component.scss']
})
export class CarouselAccueilComponent implements OnInit {
  images: Carousel[] = [
    {
      id:1,
      image:'carousel1.png'
    },
    {
      id:1,
      image:'carousel2.png'
    },
    {
      id:1,
      image:'carousel3.png'
    },
  ];
  currentIndex: number = 0;
  intervalId: any;
  timeInterval: number = 0;

  selectedIndex = 0;

  constructor(private routingService:RoutingService){

  }

  ngOnInit(): void {
    this.getCarousel();
    this.startCarousel(); // Démarre le carrousel automatique au chargement de la page
    this.routingService.testRecevoirAPI().subscribe({
      next: (data: any) => {
        // Handle successful response here
        console.log(data)
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here

        console.error('Status code:', error.status);

      }
    })

  }

  // Méthode pour changer d'image
  changeImg(increment: number): void {
    this.currentIndex = (this.currentIndex + increment + this.images.length) % this.images.length;
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

  getCarousel(){
    this.routingSevice.getCarousel().subscribe({
      next: (data: Carousel[]) => {
        this.images=data;
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
       console.log(error.status);

      }
    });
  selectImage(i:number):void {
    this.currentIndex=i
  }

}
