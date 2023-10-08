
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-mdp-oublier-changement',
  templateUrl: './mdp-oublier-changement.component.html',
  styleUrls: ['./mdp-oublier-changement.component.scss']
})
export class MdpOublierChangementComponent {
  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  passTypeV: string = "password";
  isTextV: boolean = false;
  eyeIconV: string = "fa-eye-slash";

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router, private routingService:RoutingService, private footerPosition:FooterPositionService){

  }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d<>@!#$%^&*()_+\[\]{}?:;|',./~.`\-=/]{8,}$/)]],
      validation: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator // Fonction de validation personnalisée
    });
    this.footerPosition.setIsAbsolute(true)
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
      // envoyer à la base de données
      this.toast.showToast("success", "Le changement de mot de passe a fonctionné!", "bottom-center", 1000);
      this.signupForm.reset();
      this.router.navigate(['connexion'] );

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
      this.toast.showToast("error", "Le changement de mot de passe n'a pas fonctionné", "bottom-center", 4000);
    }
  }

  sendChange(mdp:string){
    this.routingService.changeMDP(mdp)
  }

}
