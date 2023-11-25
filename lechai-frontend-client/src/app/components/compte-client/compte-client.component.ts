import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Client } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { ClientInterface } from 'src/shawnInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CouleursService } from 'src/app/services/couleurs.service';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.scss']
})
export class CompteClientComponent {
  @ViewChild('form', { static: true }) form?: ElementRef;

  client: Client =
    {
      id:1,
      prenom: 'Et Appel',
      nom: 'Maison',
      naissance: "new Date()",
      courriel: 'ET@bidon.com',
      mdp:'ioiweiroewirew74dkjhs',
      civic:123,
      rue:"rue Chien",
      apt:1,
      ville:'sherbrooke',
      province:'Quebec',
      codePostal:'J2B J4H',
    };

  constructor(private routingService : RoutingService, private footerPosition:FooterPositionService, private couleurService:CouleursService, private renderer:Renderer2)
  {

  }

  ngOnInit()
  {
    this.getClientInfo();
    this.routingService.callRefresh();
    this.footerPosition.setIsAbsolute(true)

    this.couleurService.onDataReady().subscribe(() => {
      // Data is ready, now you can safely call getCouleurByName
      this.getCouleur();
    });
  }

  getClientInfo()
  {
    this.routingService.getClientInfo().subscribe({
      next:(data:ClientInterface)=>{
        this.client.id = data.ID;
        this.client.nom=data.Nom;
        this.client.prenom=data.Prenom;
        this.client.courriel=data.Email;
        this.client.naissance=data.DateNaissance.slice(0,data.DateNaissance.indexOf('T'));


      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here

        console.error('Status code:', error.status);

      }
    })
  }

  getCouleur(){
    this.renderer.setStyle(this.form?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurBackForm"));
  }
}
