import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompteClientComponent } from './modifier-compte-client.component';

describe('ModifierCompteClientComponent', () => {
  let component: ModifierCompteClientComponent;
  let fixture: ComponentFixture<ModifierCompteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCompteClientComponent]
    });
    fixture = TestBed.createComponent(ModifierCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
