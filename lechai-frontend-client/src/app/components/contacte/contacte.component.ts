import { Component } from '@angular/core';
import { Client } from 'src/ameInterfaces';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import ValidationInput from 'src/app/helpers/validationInput';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.scss']
})
export class ContacteComponent {

  sujet: string = "";
  message: string = "";

  contactForm!: FormGroup;

  client: Client[] = [
    {
      id:1,
      prenom: 'Et Appel',
      nom: 'Maison',
      naissance: '2021-01-28',
      courriel: 'ET@bidon.com',
      mdp:'ioiweiroewirew74dkjhs',
      civic:123,
      rue:"rue Chien",
      apt:1,
      ville:'sherbrooke',
      province:'Quebec',
      codePostal:'J2B J4H',
    },
  ];

  constructor(private fb: FormBuilder, private toast: ToastService){

  }

  ngOnInit(): void{
    this.contactForm = this.fb.group({
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onContact() {
    if(this.contactForm.valid)
    {
      console.log(this.contactForm.value)
      // envoyer à la base de données
      this.toast.showToast("success", "message au sujet de " + this.sujet + " à été envoyer!", "bottom-center", 2000);
      this.contactForm.reset();

      /* this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.showToast("success", res.message, "bottom-center", 1000);
          this.loginForm.reset();
        },
        error:(err)=>{
          this.toast.showToast("error", err?.error.message, "top-center", 5000);
        }
      }) */
    }
    else{
      ValidationInput.validationInput(this.contactForm);
      this.toast.showToast("error", "Le message n'a pas pu envoyer", "bottom-center", 4000);
    }

  }

}

