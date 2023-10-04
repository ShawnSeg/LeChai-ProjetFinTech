
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router, private routingSevice:RoutingService){


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

      let token: String="TokenTemp"; /* a changer avec la base de donnee */

      this.routingSevice.connexion(this.loginForm.get('courriel')!.value, this.loginForm.get('password')!.value).subscribe(newToken=>token=newToken)

      if(token)
      {
        this.auth.setToken(token.toString())

        console.log(this.loginForm.value)
        // envoyer à la base de données
        this.toast.showToast("success", "Connexion Réussi", "bottom-center", 1000);
        this.loginForm.reset();
        this.router.navigate([''] );
      }
      else
      {
        this.toast.showToast("error", "La connexion n'a pas fonctionner", "bottom-center", 4000);
      }
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
