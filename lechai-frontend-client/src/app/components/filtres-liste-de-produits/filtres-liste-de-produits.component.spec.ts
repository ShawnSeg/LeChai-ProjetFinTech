import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltresListeDeProduitsComponent } from './filtres-liste-de-produits.component';

describe('FiltresListeDeProduitsComponent', () => {
  let component: FiltresListeDeProduitsComponent;
  let fixture: ComponentFixture<FiltresListeDeProduitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltresListeDeProduitsComponent]
    });
    fixture = TestBed.createComponent(FiltresListeDeProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
