
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ApiResponse } from 'src/shawnInterface';
import { group } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  showForm = false;

  loginForm!: FormGroup;




  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router,  private routingSevice:RoutingService, private http:HttpClient){


  }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      courriel: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.passType = "text" : this.passType = "password";
  }

  onLogin(){
    if(this.loginForm.valid)
    {

      /* this.toast.showToast("success", "Connexion réussi.", "bottom-center", 4000);
      this.auth.setToken("tokenTemp");
      this.router.navigate([""]); */

      this.routingSevice.connexion(this.loginForm.get('courriel')!.value, this.loginForm.get('password')!.value).subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.router.navigate([`/checkClient`]);
          this.loginForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'il n\'existe pas de compte avec ce courriel et ce mot de passe.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });


      // Use template literals to interpolate the value into the URL



    }
    else{
      ValidationInput.validationInput(this.loginForm);
      this.toast.showToast("error", "Les valeurs entrées ne respectent pas les règles.", "bottom-center", 4000);
    }

  }



  toggleForm(){
    if(this.showForm)
    {
      this.showForm=false;
    }
    else
    {
      this.showForm=true;
    }
  }


}
