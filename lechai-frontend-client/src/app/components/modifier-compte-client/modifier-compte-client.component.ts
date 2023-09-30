import { Component } from '@angular/core';
import { Client } from 'src/ameInterfaces';

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
}
