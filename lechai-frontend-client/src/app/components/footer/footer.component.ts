import { Component, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @ViewChild('footer', { static: true }) footer?: ElementRef;

  ngOnInit() {
    // Get a reference to the element you want to calculate the offset for
    const element: HTMLElement = this.footer?.nativeElement as HTMLElement;

    // Get the element's position relative to the viewport
    const rect: DOMRect = element.getBoundingClientRect();

    // Calculate the difference between the element's top and the top of the viewport
    const offset: number = rect.top;
    if(offset>10)
    {
      (this.footer?.nativeElement as HTMLElement).classList.add("absolute")
    }

    console.log('Offset from top of viewport:', offset);
  }
}
