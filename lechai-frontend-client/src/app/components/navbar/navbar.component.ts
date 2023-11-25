import { Component, ViewChild, ElementRef, OnInit, Renderer2  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Subscription } from 'rxjs';
import { CouleursService } from 'src/app/services/couleurs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('burger', { static: true }) burger?: ElementRef;
  @ViewChild('menuMobile', { static: true }) menuMobile?: ElementRef;
  @ViewChild('menuDesktop', { static: true }) menuDesktop?: ElementRef;
  @ViewChild('cercle', { static: true }) cercle?: ElementRef;

  connecter:boolean = false;
  token$!: Observable<string | null>;

  imagePanier:string="https://localhost:7247/GetImage/imagesAutres/panier.png"
  imageListeSouhait:string="https://localhost:7247/GetImage/imagesAutres/liste_souhait.png"
  imageTitre:string="https://localhost:7247/GetImage/imagesAutres/devany chai (1).png"
  imageLogo:string="https://localhost:7247/GetImage/imagesAutres/logo.png"

  private subscription: Subscription;

  constructor(private auth: AuthService, private router: Router, private toast: ToastService, private connexion:ConnexionService, private couleurService:CouleursService, private renderer: Renderer2){
    this.subscription = this.connexion.isConnected$.subscribe(isConnected => {
      if (isConnected) {
        this.connecter = true
      } else {
        this.connecter = false;
      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem("token"))
    {
      this.connecter = true
    }

    this.couleurService.onDataReady().subscribe(() => {
      // Data is ready, now you can safely call getCouleurByName
      this.getCouleur();
    });

  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

  toggleButton():void{
    const burger = this.burger?.nativeElement as HTMLElement;
    const menuMobile = this.menuMobile?.nativeElement as HTMLElement;

    if(burger.classList.contains("active"))
    {
      burger.classList.remove("active")
      menuMobile.classList.add("hide")
    }
    else
    {
      burger.classList.add("active")
      menuMobile.classList.remove("hide")
    }
  }

  deconnecter()
  {

    localStorage.removeItem("token")
    this.connecter = false
    this.router.navigate([""]);
    this.connexion.setIsAbsolute(false)
    this.toast.showToast("success", "Déconnexion réussi.", "bottom-center", 4000);
  }

  getCouleur(){

    this.renderer.setStyle(this.menuDesktop?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurNav"));
    this.renderer.setStyle(this.cercle?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurNav"));
  }
}
