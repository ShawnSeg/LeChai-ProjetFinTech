import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesDetailsComponent } from './commandes-details.component';

describe('CommandesDetailsComponent', () => {
  let component: CommandesDetailsComponent;
  let fixture: ComponentFixture<CommandesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandesDetailsComponent]
    });
    fixture = TestBed.createComponent(CommandesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
