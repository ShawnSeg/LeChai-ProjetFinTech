
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent {

  public token :String ="";




  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router, private routingService:RoutingService){

  }

  ngOnInit(): void{

  }



  checkToken(){
    this.routingService.checkToken(this.token).subscribe(
      (data: any) => {
        // Handle successful response here
        this.toast.showToast("success", 'Vous êtes connecté!', "bottom-center", 4000);
        localStorage.setItem("token", data)
        this.router.navigate([``]);

      },
      (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'Le code fourni ne correspond pas à celui envoyé au courriel.', "bottom-center", 4000);
        console.error('Status code:', error.status);
      }
    );
  }



}


