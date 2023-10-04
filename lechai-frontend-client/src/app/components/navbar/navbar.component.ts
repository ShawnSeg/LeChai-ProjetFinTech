import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

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

  constructor(private auth: AuthService){}

  ngOnInit() {
    this.token$ = this.auth.token$;
    this.token$.subscribe((token) => {
      this.connecter = !!token; // Met à jour la variable "connecter" en fonction du token
    });
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
    this.auth.setToken("");
  }
}
