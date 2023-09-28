import { Component, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('burger', { static: true }) burger?: ElementRef;
  @ViewChild('menuMobile', { static: true }) menuMobile?: ElementRef;

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
}
