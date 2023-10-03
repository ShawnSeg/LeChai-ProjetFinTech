import { Component, Output, EventEmitter} from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-mdp-oublier-envoi',
  templateUrl: './mdp-oublier-envoi.component.html',
  styleUrls: ['./mdp-oublier-envoi.component.scss']
})
export class MdpOublierEnvoiComponent {
  @Output() hideForm = new EventEmitter<boolean>(); // Event emitter for removing the product


  showForm = true
  public resetPasswordEmail!:string;
  public isValidEmail=false;

constructor(private routingService:RoutingService)
{

}
  toggleForm(){
    this.showForm=false

    setTimeout(() => {
      this.hideForm.emit(false);
    }, 500);
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }



  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail))
    {
      alert("yay")
      this.toggleForm();
      this.routingService.changeMDP(this.resetPasswordEmail)
    }
  }
}
