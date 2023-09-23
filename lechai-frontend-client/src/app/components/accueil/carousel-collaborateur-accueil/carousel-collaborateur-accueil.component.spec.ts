import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCollaborateurAccueilComponent } from './carousel-collaborateur-accueil.component';

describe('CarouselCollaborateurAccueilComponent', () => {
  let component: CarouselCollaborateurAccueilComponent;
  let fixture: ComponentFixture<CarouselCollaborateurAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselCollaborateurAccueilComponent]
    });
    fixture = TestBed.createComponent(CarouselCollaborateurAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
