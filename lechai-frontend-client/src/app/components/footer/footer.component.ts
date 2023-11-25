import { Component, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Subscription } from 'rxjs';
import { CouleursService } from 'src/app/services/couleurs.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  @ViewChild('footer', { static: true }) footer?: ElementRef;
  private subscription: Subscription;

  constructor(private footerPosition: FooterPositionService, private couleurService:CouleursService, private renderer:Renderer2) {
    // Subscribe to changes in the isAbsolute property
    this.subscription = this.footerPosition.isAbsolute$.subscribe(isAbsolute => {
      if (isAbsolute) {
        (this.footer?.nativeElement as HTMLElement).classList.add('absolute');
        (this.footer?.nativeElement as HTMLElement).classList.remove('sticky');
      } else {
        (this.footer?.nativeElement as HTMLElement).classList.add('sticky');
        (this.footer?.nativeElement as HTMLElement).classList.remove('absolute');
      }
    });
  }

  ngOnInit()
  {
    this.couleurService.onDataReady().subscribe(() => {
      // Data is ready, now you can safely call getCouleurByName
      this.getCouleur();
    });
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();


  }

  getCouleur(){

    this.renderer.setStyle(this.footer?.nativeElement, 'background-color', this.couleurService.getCouleurByName("CouleurFooter"));

  }
}
