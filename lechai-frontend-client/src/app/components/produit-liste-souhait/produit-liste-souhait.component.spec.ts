import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitListeSouhaitComponent } from './produit-liste-souhait.component';

describe('ProduitListeSouhaitComponent', () => {
  let component: ProduitListeSouhaitComponent;
  let fixture: ComponentFixture<ProduitListeSouhaitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitListeSouhaitComponent]
    });
    fixture = TestBed.createComponent(ProduitListeSouhaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
