import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { RoutingService } from 'src/app/services/routing.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  constructor(private footerPosition:FooterPositionService, private routingService:RoutingService)
  {

  }

  ngOnInit(){
    this.footerPosition.setIsAbsolute(false)
    this.routingService.callRefresh();



  }

}
