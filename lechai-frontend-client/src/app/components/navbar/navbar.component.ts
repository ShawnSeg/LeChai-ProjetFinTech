import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('burger', { static: true }) burger?: ElementRef;
  @ViewChild('menuMobile', { static: true }) menuMobile?: ElementRef;

  connecter:boolean = false;
  token$!: Observable<string | null>;

  private subscription: Subscription;

  constructor(private auth: AuthService, private router: Router, private toast: ToastService, private connexion:ConnexionService){
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
}
