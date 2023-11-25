import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { ToastService } from 'src/app/services/toast.service';
import { Client } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClientInterface } from 'src/shawnInterface';
import { DatePipe } from '@angular/common';
import { CouleursService } from 'src/app/services/couleurs.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-modifier-compte-client',
  templateUrl: './modifier-compte-client.component.html',
  styleUrls: ['./modifier-compte-client.component.scss']
})
export class ModifierCompteClientComponent {
  @ViewChild('form', { static: true }) form?: ElementRef;
  client: Client={
    id:0,
    nom:"",
    prenom:"",
    courriel:"",
    mdp:"",
  }

  public prenom:String = "";
  public nom:String = "";
  public dateNaissance:Date = new Date();
  public no_civique:String = "";
  public rue:String = "";
  public ville:String = "";
  public province:String = "";
  public codePostal:String = "";
  public oldEmail: String = ""

  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  passTypeV: string = "password";
  isTextV: boolean = false;
  eyeIconV: string = "fa-eye-slash";

  passTypeA: string = "password";
  isTextA: boolean = false;
  eyeIconA: string = "fa-eye-slash";

  modCompteClntForm!: FormGroup;
  clientInfo = this.client;

  constructor(private fb: FormBuilder, private toast: ToastService, private router: Router, private routingService:RoutingService, private footerPosition:FooterPositionService,  private renderer:Renderer2, private couleurService:CouleursService){

  }

  ngOnInit(): void{


    this.getInfoClient();
    this.couleurService.onDataReady().subscribe(()=>{
      this.getCouleur()
    })


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

  passwordMatchValidatorActuel(group: FormGroup) {

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

  hideShowPassA(){
    this.isTextA = !this.isTextA;
    this.isTextA ? this.eyeIconA = "fa-eye" : this.eyeIconA = "fa-eye-slash";
    this.isTextA ? this.passTypeA = "text" : this.passTypeA = "password";
  }

  onChange(){
    if(this.modCompteClntForm.get('password')!.value === ""){
      this.modCompteClntForm.get('password')?.setValue(this.modCompteClntForm.get("validationActuel")!.value);
      this.modCompteClntForm.get('validation')?.setValue(this.modCompteClntForm.get("validationActuel")!.value);
    }

    if(this.modCompteClntForm.valid)
    {
      alert(this.modCompteClntForm.get("prenom"))
      let date = new Date(this.modCompteClntForm.get('date')!.value)
      this.routingService.postChangementMDPAuthentifier(this.oldEmail, this.modCompteClntForm.get("validationActuel")!.value, this.modCompteClntForm.get('password')!.value).subscribe({
        next: (data: any) => {
          // Handle successful response here

          this.routingService.UpdateChangementInfoClient(this.modCompteClntForm.get('prenom')!.value,this.modCompteClntForm.get('nom')!.value,date,this.modCompteClntForm.get('courriel')!.value, Number(this.client!.id)).subscribe({
            next: (data: any) => {
              // Handle successful response here
              this.toast.showToast("success", 'Les modifications ont été sauvegardées!', "bottom-center", 4000);
              this.router.navigate([`/compteClient`]);


            },
            error: (error: HttpErrorResponse) => {
              // Handle error response here
              this.toast.showToast("error", 'non.', "bottom-center", 4000);
              console.error('Status code:', error.status);

            }
          });
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'oof.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });



    }
    else
    {
      this.toast.showToast("error", "Les informations n'ont pas pu être changer", "bottom-center", 4000);
      this.modCompteClntForm.get('password')?.setValue('');
      this.modCompteClntForm.get('validation')?.setValue('');
    }
  }

  annuler(){
    this.toast.showToast("info", "Les valeur initial ont été replacer", "bottom-center", 4000);
    this.router.navigate(['compteClient'] );
  }

  getInfoClient()
  {
    this.routingService.getClientInfo().subscribe({
      next:(data:ClientInterface)=>{

        this.client!.id = data.ID;
        this.client!.prenom=data.Prenom;
        this.client!.nom=data.Nom;
        this.client!.courriel=data.Email;
        this.oldEmail=data.Email;
        this.client!.naissance=data.DateNaissance.slice(0,data.DateNaissance.indexOf('T'))


        this.clientInfo = this.client;

        this.modCompteClntForm = this.fb.group({
          prenom: [this.clientInfo?.prenom, Validators.required],
          nom: [this.clientInfo?.nom, Validators.required],
          date: [this.clientInfo?.naissance],
          civic: [this.clientInfo?.civic],
          rue: [this.clientInfo?.rue],
          apt: [this.clientInfo?.apt],
          ville: [this.clientInfo?.ville],
          province: [this.clientInfo?.province],
          codePostal: [this.clientInfo?.codePostal],
          courriel: [this.clientInfo?.courriel, [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
          password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d<>@!#$%^&*()_+\[\]{}?:;|',./~.`\-=/]{8,}$/)]],
          validation: ['', Validators.required],
          validationActuel: ['', Validators.required],
        }, {
          validators: [this.passwordMatchValidator],
        });
        this.routingService.callRefresh();
        this.footerPosition.setIsAbsolute(false)
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'non.', "bottom-center", 4000);


      }
    })
  }

  getCouleur(){
    this.renderer.setStyle(this.form?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurBackForm"));

  }
}
