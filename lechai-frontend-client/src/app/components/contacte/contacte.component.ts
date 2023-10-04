import { Component } from '@angular/core';
import { Client } from 'src/ameInterfaces';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import ValidationInput from 'src/app/helpers/validationInput';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private toast: ToastService, private routingService:RoutingService){

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
      this.routingService.envoiCourriel(this.contactForm.get('sujet')!.value, this.contactForm.get('message')!.value).subscribe(
        (data: any) => {
          // Handle successful response here
          this.toast.showToast("success", "Le message  " + this.sujet + " a été envoyé avec succès!", "bottom-center", 4000);
          this.contactForm.reset();
        },
        (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Le message n\a pas pu être envoyé... Veuillez essayer plus tard.', "bottom-center", 4000);
          console.error('Status code:', error.status);
        }
      );
      // envoyer à la base de données



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

