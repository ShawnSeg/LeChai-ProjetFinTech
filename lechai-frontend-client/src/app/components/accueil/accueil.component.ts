import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  constructor(private footerPosition:FooterPositionService)
  {

  }

  ngOnInit(){
    this.footerPosition.setIsAbsolute(false)
  }

}
