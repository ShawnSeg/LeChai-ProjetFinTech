import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCommandeDetailComponent } from './produit-commande-detail.component';

describe('ProduitCommandeDetailComponent', () => {
  let component: ProduitCommandeDetailComponent;
  let fixture: ComponentFixture<ProduitCommandeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitCommandeDetailComponent]
    });
    fixture = TestBed.createComponent(ProduitCommandeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
