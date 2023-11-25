import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  constructor(private footerPosition:FooterPositionService){}

  ngOnInit()
  {
    this.footerPosition.setIsAbsolute(true)
  }
}
