import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAccueilComponent } from './carousel-accueil.component';

describe('CarouselAccueilComponent', () => {
  let component: CarouselAccueilComponent;
  let fixture: ComponentFixture<CarouselAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselAccueilComponent]
    });
    fixture = TestBed.createComponent(CarouselAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
