import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';
import { CouleursService } from './services/couleurs.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lechai-frontend-client';
  showToast = false;
  toastMsg = "";
  toastType = "";
  toastPosition = "";

  constructor(private toast: ToastService, private couleurService:CouleursService) {

  }

  ngOnInit(): void {
    this.toast.status.subscribe((msg: string) =>{
      this.toastType = localStorage.getItem("toastType") || "";
      this.toastPosition = localStorage.getItem("toastPosition") || "";
      if (msg === null){
        this.showToast = false;
      }
      else {
        this.showToast = true;
        this.toastMsg = msg;
      }
    })

    this.couleurService.getCouleursBD();
    this.couleurService.onDataReady().subscribe(() => {
      // Data is ready, now you can proceed to initialize other components
      // For example, trigger the initialization of NavbarComponent
      this.initializeNavbarComponent();
    });

  }

  closeToast() {
    this.showToast = false;
  }

  onActive(){
    window.scroll(0, 0);
  }

  private initializeNavbarComponent() {
    // Initialize NavbarComponent or trigger whatever logic you need
  }
}
