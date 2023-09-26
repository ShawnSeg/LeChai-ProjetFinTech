import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreListeCollaborateursComponent } from './filtre-liste-collaborateurs.component';

describe('FiltreListeCollaborateursComponent', () => {
  let component: FiltreListeCollaborateursComponent;
  let fixture: ComponentFixture<FiltreListeCollaborateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreListeCollaborateursComponent]
    });
    fixture = TestBed.createComponent(FiltreListeCollaborateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
