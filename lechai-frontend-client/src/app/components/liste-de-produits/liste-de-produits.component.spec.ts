import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeProduitsComponent } from './liste-de-produits.component';

describe('ListeDeProduitsComponent', () => {
  let component: ListeDeProduitsComponent;
  let fixture: ComponentFixture<ListeDeProduitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDeProduitsComponent]
    });
    fixture = TestBed.createComponent(ListeDeProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
