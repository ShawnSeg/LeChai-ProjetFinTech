import { Component, Renderer2 } from '@angular/core';
import { Client } from 'src/ameInterfaces';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import ValidationInput from 'src/app/helpers/validationInput';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { ClientInterface } from 'src/shawnInterface';
import { CouleursService } from 'src/app/services/couleurs.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.scss']
})
export class ContacteComponent {
  @ViewChild('form', { static: true }) form?: ElementRef;
  sujet: string = "";
  message: string = "";
  connecter:boolean = false;
  token$!: Observable<string | null>;
  courriel:string = ""

  contactForm!: FormGroup;

  client: Client[] = [
    {
      id:1,
      prenom: 'Et Appel',
      nom: 'Maison',
      naissance: "new Date()",
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

  constructor(private fb: FormBuilder, private toast: ToastService, private routingService:RoutingService, private auth: AuthService, private footerPosition: FooterPositionService, private renderer:Renderer2, private couleurService:CouleursService){

  }

  ngOnInit(): void{
    this.contactForm = this.fb.group({
      courriel:['', Validators.required],
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.token$ = this.auth.token$;
    this.token$.subscribe((token) => {
      this.connecter = !!token; // Met à jour la variable "connecter" en fonction du token
    });
    if(!localStorage.getItem("token"))
    {
     this.footerPosition.setIsAbsolute(true)
    }
    else
    {
      this.footerPosition.setIsAbsolute(false)
    }
    this.routingService.callRefresh();
    this.courriel = ""
    this.getInfoClient();

    this.couleurService.onDataReady().subscribe(()=>{
      this.getCouleur()
    })

  }

  onContact() {
    if(this.contactForm.valid)
    {
      this.routingService.envoiCourriel(this.courriel, this.contactForm.get('sujet')!.value, this.contactForm.get('message')!.value).subscribe(
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

    }
    else{
      ValidationInput.validationInput(this.contactForm);
      this.toast.showToast("error", "Veuillez remplir tout le formulaire d'envoi.", "bottom-center", 4000);
    }

  }

  getInfoClient(){
    this.routingService.getClientInfo().subscribe({
      next:(data:ClientInterface)=>
      {

        this.courriel = data.Email
      },
      error:(error:HttpErrorResponse)=>
      {

      }
    })
  }

  getCouleur(){
    this.renderer.setStyle(this.form?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurBackForm"));

  }

}

