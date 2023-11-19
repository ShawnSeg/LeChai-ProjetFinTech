import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  passTypeV: string = "password";
  isTextV: boolean = false;
  eyeIconV: string = "fa-eye-slash";

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router, private routingService:RoutingService, private footerPosition:FooterPositionService, private connexionService:ConnexionService){

  }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      date: ['', Validators.required],
      courriel: ['', [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d<>@!#$%^&*()_+\[\]{}?:;|',./~.`\-=/]{8,}$/)]],
      validation: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator // Fonction de validation personnalisée
    });
    this.routingService.callRefresh();
    this.footerPosition.setIsAbsolute(false)
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')!.value;
    const validation = group.get('validation')!.value;

    // Comparez les valeurs des champs "password" et "validation"
    if (password === validation) {
      return null; // Correspondance, pas d'erreur de validation
    } else {
      return { mismatch: true }; // Pas de correspondance, retourne une erreur de validation
    }
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.passType = "text" : this.passType = "password";
  }

  hideShowPassV(){
    this.isTextV = !this.isTextV;
    this.isTextV ? this.eyeIconV = "fa-eye" : this.eyeIconV = "fa-eye-slash";
    this.isTextV ? this.passTypeV = "text" : this.passTypeV = "password";
  }

  onSignup(){
    if(this.signupForm.valid)
    {
      console.log(this.signupForm.value)

      this.routingService.inscription(this.signupForm.get('prenom')!.value, this.signupForm.get('nom')!.value,this.signupForm.get('date')!.value,this.signupForm.get('courriel')!.value,this.signupForm.get('password')!.value).subscribe(
        (data: any) => {
          // Handle successful response here
          //this.toast.showToast("info", "Un courriel de confirmation vous a été envoyé.", "bottom-center", 6000);
          this.signupForm.reset();
          localStorage.setItem("token", data)
          this.connexionService.setIsAbsolute(true)
          this.router.navigate([''] );
        },
        (error: HttpErrorResponse) => {
          // Handle error response here
          ValidationInput.validationInput(this.signupForm);
          this.toast.showToast("error", "L'inscription n'a pas fonctionner", "bottom-center", 4000);
          console.error('Status code:', error.status);
        }
      );
      // envoyer à la base de données


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
      ValidationInput.validationInput(this.signupForm);
      this.toast.showToast("error", "L'inscription n'a pas fonctionner", "bottom-center", 4000);
    }
  }

  sendInfo(prenom:string, nom:string, date:Date, courrie:string, password:string){
    this.routingService.inscription(prenom, nom, date, courrie, password);
  }
}
