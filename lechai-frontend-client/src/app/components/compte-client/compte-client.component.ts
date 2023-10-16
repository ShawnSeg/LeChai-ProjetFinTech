import { Component } from '@angular/core';
import { Client } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { ClientInterface } from 'src/shawnInterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.scss']
})
export class CompteClientComponent {

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

  constructor(private routingService : RoutingService, private footerPosition:FooterPositionService)
  {

  }

  ngOnInit()
  {
    this.getClientInfo();
    this.routingService.callRefresh();
    this.footerPosition.setIsAbsolute(false)
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


}
