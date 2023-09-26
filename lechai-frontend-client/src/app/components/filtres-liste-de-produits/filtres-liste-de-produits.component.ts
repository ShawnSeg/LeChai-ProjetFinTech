import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-filtres-liste-de-produits',
  templateUrl: './filtres-liste-de-produits.component.html',
  styleUrls: ['./filtres-liste-de-produits.component.scss']
})
export class FiltresListeDeProduitsComponent {
  @ViewChild('filtreButton', { static: true }) filtreButton?: ElementRef;
  @ViewChild('filtreForm', { static: true }) filtreForm?: ElementRef;

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
}
