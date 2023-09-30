import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  @ViewChild('footer', { static: true }) footer?: ElementRef;
  private subscription: Subscription;

  constructor(private footerPosition: FooterPositionService) {
    // Subscribe to changes in the isAbsolute property
    this.subscription = this.footerPosition.isAbsolute$.subscribe(isAbsolute => {
      if (isAbsolute) {
        (this.footer?.nativeElement as HTMLElement).classList.add('absolute');
        (this.footer?.nativeElement as HTMLElement).classList.remove('relative');
      } else {
        (this.footer?.nativeElement as HTMLElement).classList.add('relative');
        (this.footer?.nativeElement as HTMLElement).classList.remove('absolute');
      }
    });
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
