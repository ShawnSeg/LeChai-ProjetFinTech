import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesListeCommandesComponent } from './commandes-liste-commandes.component';

describe('CommandesListeCommandesComponent', () => {
  let component: CommandesListeCommandesComponent;
  let fixture: ComponentFixture<CommandesListeCommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandesListeCommandesComponent]
    });
    fixture = TestBed.createComponent(CommandesListeCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
