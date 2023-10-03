import { Component } from '@angular/core';
import { Client } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-modifier-compte-client',
  templateUrl: './modifier-compte-client.component.html',
  styleUrls: ['./modifier-compte-client.component.scss']
})
export class ModifierCompteClientComponent {

  client: Client[] = [
    {
      id:1,
      prenom: 'Et Appel',
      nom: 'Maison',
      naissance: '2021-01-28',
      courriel: 'ET@bidon.com',
      mdp:'ioiweiroewirew74dkjhs',
      civic:123,
      rue:"rue Chien",
      apt:1,
      ville:'sherbrooke',
      province:'Quebec',
      codePostal:'J2B J4H',
    },
  ];

  public prenom:String = "";
  public nom:String = "";
  public dateNaissance:Date = new Date();
  public no_civique:String = "";
  public rue:String = "";
  public ville:String = "";
  public province:String = "";
  public codePostal:String = "";

  constructor(private routingService:RoutingService)
  {

  }


}
