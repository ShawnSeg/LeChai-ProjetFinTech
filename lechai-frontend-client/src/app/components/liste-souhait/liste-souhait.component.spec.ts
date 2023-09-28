import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSouhaitComponent } from './liste-souhait.component';

describe('ListeSouhaitComponent', () => {
  let component: ListeSouhaitComponent;
  let fixture: ComponentFixture<ListeSouhaitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSouhaitComponent]
    });
    fixture = TestBed.createComponent(ListeSouhaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
