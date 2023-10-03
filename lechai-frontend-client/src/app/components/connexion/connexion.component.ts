
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ApiResponse } from 'src/shawnInterface';
import { group } from '@angular/animations';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  showForm = false;

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router, private cookie: CookieService,  private routingSevice:RoutingService){

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
      let token: String="";
      this.routingSevice.connexion(this.loginForm.get('courriel')!.value, this.loginForm.get('password')!.value).subscribe(newToken=>token=newToken)


       localStorage.setItem('token', token.toString());





      // envoyer à la base de données
      this.toast.showToast("success", "Connexion Réussi", "bottom-center", 1000);
      this.loginForm.reset();
      this.router.navigate([''] );

      /* this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.showToast("success", res.message, "bottom-center", 1000);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toast.showToast("error", err?.error.message, "top-center", 5000);
        }
      }) */
    }
    else{
      ValidationInput.validationInput(this.loginForm);
      this.toast.showToast("error", "La connexion n'a pas fonctionner", "bottom-center", 4000);
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
