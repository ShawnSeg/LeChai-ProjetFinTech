import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent {

  constructor(private footerPosition:FooterPositionService){}

  ngOnInit()
  {
    this.footerPosition.setIsAbsolute(true)
  }
}
