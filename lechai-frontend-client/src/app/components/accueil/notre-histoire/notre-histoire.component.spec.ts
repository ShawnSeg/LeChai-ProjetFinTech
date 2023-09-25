import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotreHistoireComponent } from './notre-histoire.component';

describe('NotreHistoireComponent', () => {
  let component: NotreHistoireComponent;
  let fixture: ComponentFixture<NotreHistoireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotreHistoireComponent]
    });
    fixture = TestBed.createComponent(NotreHistoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
