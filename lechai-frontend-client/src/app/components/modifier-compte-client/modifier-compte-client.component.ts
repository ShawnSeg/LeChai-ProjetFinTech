import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { ToastService } from 'src/app/services/toast.service';
import { Client } from 'src/ameInterfaces';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modifier-compte-client',
  templateUrl: './modifier-compte-client.component.html',
  styleUrls: ['./modifier-compte-client.component.scss']
})
export class ModifierCompteClientComponent {

  client: Client[] = [
    {
      id:1,
      prenom: 'Et Appel',
      nom: 'Maison',
      naissance: '2021-01-28',
      courriel: 'ET@bidon.com',
      mdp:'BillieChien1!',
      civic:123,
      rue:"rue Chien",
      apt:1,
      ville:'sherbrooke',
      province:'Quebec',
      codePostal:'J2B J4H',
    },
  ];

  public prenom:String = "";
  public nom:String = "";
  public dateNaissance:Date = new Date();
  public no_civique:String = "";
  public rue:String = "";
  public ville:String = "";
  public province:String = "";
  public codePostal:String = "";

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
  clientInfo = this.client[0];

  constructor(private fb: FormBuilder, private toast: ToastService, private router: Router, private routingService:RoutingService, private footerPosition:FooterPositionService){

  }

  ngOnInit(): void{

    console.log(this.clientInfo);

    this.modCompteClntForm = this.fb.group({
      prenom: [this.clientInfo.prenom, Validators.required],
      nom: [this.clientInfo.nom, Validators.required],
      date: [this.clientInfo.naissance, Validators.required],
      civic: [this.clientInfo.civic],
      rue: [this.clientInfo.rue],
      apt: [this.clientInfo.apt],
      ville: [this.clientInfo.ville],
      province: [this.clientInfo.province],
      codePostal: [this.clientInfo.codePostal],
      courriel: [this.clientInfo.courriel, [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d<>@!#$%^&*()_+\[\]{}?:;|',./~.`\-=/]{8,}$/)]],
      validation: ['', Validators.required],
      validationActuel: ['', Validators.required],
    }, {
      validators: [this.passwordMatchValidator],
    });

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

  passwordMatchValidatorActuel(group: FormGroup) {
    const passwordActuel = this.clientInfo.mdp;
    const validationActuel = group.get('validationActuel')!.value;

    // Comparez les valeurs des champs "password" et "validation"
    if (passwordActuel === validationActuel) {
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

  hideShowPassA(){
    this.isTextA = !this.isTextA;
    this.isTextA ? this.eyeIconA = "fa-eye" : this.eyeIconA = "fa-eye-slash";
    this.isTextA ? this.passTypeA = "text" : this.passTypeA = "password";
  }

  onChange(){
    if(this.modCompteClntForm.get('password')!.value === ""){
      this.modCompteClntForm.get('password')?.setValue(this.clientInfo.mdp);
      this.modCompteClntForm.get('validation')?.setValue(this.clientInfo.mdp);
    }

    if(this.modCompteClntForm.valid)
    {
      let date = new Date(this.modCompteClntForm.get('date')!.value)

      this.routingService.UpdateChangementInfoClient(this.modCompteClntForm.get('prenom')!.value,this.modCompteClntForm.get('nom')!.value,date,this.modCompteClntForm.get('courriel')!.value, Number(this.client[0].id)).subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.toast.showToast("success", 'wahoo', "bottom-center", 4000);
          this.routingService.postChangementMDPAuthentifier(this.modCompteClntForm.get('password')!.value).subscribe({
            next: (data: any) => {
              // Handle successful response here
              this.toast.showToast("success", 'yay', "bottom-center", 4000);

            },
            error: (error: HttpErrorResponse) => {
              // Handle error response here
              this.toast.showToast("error", 'oof.', "bottom-center", 4000);
              console.error('Status code:', error.status);

            }
          });

        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'non.', "bottom-center", 4000);
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
}
