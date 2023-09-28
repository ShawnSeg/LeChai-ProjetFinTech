import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteClientComponent } from './compte-client.component';

describe('CompteClientComponent', () => {
  let component: CompteClientComponent;
  let fixture: ComponentFixture<CompteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompteClientComponent]
    });
    fixture = TestBed.createComponent(CompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
