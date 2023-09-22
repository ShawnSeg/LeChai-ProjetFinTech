import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitPhareAccueilComponent } from './produit-phare-accueil.component';

describe('ProduitPhareAccueilComponent', () => {
  let component: ProduitPhareAccueilComponent;
  let fixture: ComponentFixture<ProduitPhareAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitPhareAccueilComponent]
    });
    fixture = TestBed.createComponent(ProduitPhareAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
