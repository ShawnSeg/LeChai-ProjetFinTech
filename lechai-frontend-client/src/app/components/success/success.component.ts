import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  constructor(private footerPosition:FooterPositionService, private routingService:RoutingService){}

  ngOnInit()
  {
    this.footerPosition.setIsAbsolute(true)
    this.routingService.putSuccess().subscribe({
      next:(data:any)=>{

      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
      }
    })
  }
}
