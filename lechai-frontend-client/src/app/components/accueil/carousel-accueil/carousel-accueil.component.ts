import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/ameInterfaces';

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

  ngOnInit(): void {
    this.startCarousel(); // Démarre le carrousel automatique au chargement de la page
    localStorage.setItem("token", "2")
  }

  // Méthode pour changer d'image
  changeImg(increment: number): void {
    this.currentIndex = (this.currentIndex + increment + this.images.length) % this.images.length;
  }

  // Méthode pour démarrer le carrousel automatique
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.changeImg(1); // Change l'image automatiquement
    }, 2000);
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

}
