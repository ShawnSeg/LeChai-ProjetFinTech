import { Component, Input  } from '@angular/core';
import { Collaborateurs } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { ProduitPanier } from 'src/shawnInterface';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesAPI, ProduitInterface, ProduitTestAPI } from 'src/shawnInterface';

@Component({
  selector: 'app-liste-collaborateurs',
  templateUrl: './liste-collaborateurs.component.html',
  styleUrls: ['./liste-collaborateurs.component.scss']
})
export class ListeCollaborateursComponent {
  @Input() collab?:Collaborateurs

  image:string="https://apilechai.azurewebsites.net/GetImage/"
  nbrProduit = 0;

  constructor(private routingService:RoutingService){}

  ngOnInit()
  {
    this.image+=this.collab?.image
    this.getProduitsCollaborateur()
  }

  getProduitsCollaborateur()
  {
    this.routingService.getProduitsCollaborateurs(this.collab?.id||0).subscribe({
      next:(data:ProduitInterface[])=>{

        this.nbrProduit=data.length
      },
      error:(error:HttpErrorResponse)=>{

      }
    })
  }
}
