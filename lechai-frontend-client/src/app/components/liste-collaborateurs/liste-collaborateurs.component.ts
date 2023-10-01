import { Component, Input  } from '@angular/core';
import { Collaborateurs } from 'src/ameInterfaces';

@Component({
  selector: 'app-liste-collaborateurs',
  templateUrl: './liste-collaborateurs.component.html',
  styleUrls: ['./liste-collaborateurs.component.scss']
})
export class ListeCollaborateursComponent {
  @Input() collab?:Collaborateurs

}
