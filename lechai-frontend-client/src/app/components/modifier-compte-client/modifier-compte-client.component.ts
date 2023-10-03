import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { ToastService } from 'src/app/services/toast.service';
import { Client } from 'src/ameInterfaces';

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
      mdp:'ioiweiroewirew74dkjhs',
      civic:123,
      rue:"rue Chien",
      apt:1,
      ville:'sherbrooke',
      province:'Quebec',
      codePostal:'J2B J4H',
    },
  ];

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

  constructor(private fb: FormBuilder, private toast: ToastService, private router: Router){

  }

  ngOnInit(): void{

    this.modCompteClntForm = this.fb.group({
      prenom: [this.clientInfo.prenom, Validators.required],
      nom: [this.clientInfo.nom, Validators.required],
      date: [this.clientInfo.naissance, Validators.required],
      courriel: [this.clientInfo.courriel, [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d<>@!#$%^&*()_+\[\]{}?:;|',./~.`\-=/]{8,}$/)]],
      validation: ['', Validators.required],
      validationActuel: ['', Validators.required],
    }, {
      validator: [this.passwordMatchValidator, this.passwordMatchValidatorActuel], // Fonction de validation personnalisée
    });
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
    const password = group.get('validationActuel')!.value; /* !!!!!!!!!!!!!!changer pour le mdp de la BD!!!!! */
    const validation = group.get('validationActuel')!.value;

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

  hideShowPassA(){
    this.isTextA = !this.isTextA;
    this.isTextA ? this.eyeIconA = "fa-eye" : this.eyeIconA = "fa-eye-slash";
    this.isTextA ? this.passTypeA = "text" : this.passTypeA = "password";
  }

  onChange(){

    if(this.modCompteClntForm.valid)
    {
      this.toast.showToast("success", "Les informations de votre compte ont été changer", "bottom-center", 4000);
    }
    else
    {
      this.toast.showToast("error", "Les informations n'ont pas pu être changer", "bottom-center", 4000);
    }
  }

  annuler(){

    this.modCompteClntForm = this.fb.group({
      prenom: this.clientInfo.prenom,
      nom: this.clientInfo.nom,
      date: this.clientInfo.naissance,
      courriel: this.clientInfo.courriel,
      password: '',
      validation: '',
      validationActuel: '',
    });

    this.toast.showToast("info", "Les valeur initial ont été replacer", "bottom-center", 4000);
  }
}
