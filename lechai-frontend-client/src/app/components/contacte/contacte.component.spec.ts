import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacteComponent } from './contacte.component';

describe('ContacteComponent', () => {
  let component: ContacteComponent;
  let fixture: ComponentFixture<ContacteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContacteComponent]
    });
    fixture = TestBed.createComponent(ContacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
