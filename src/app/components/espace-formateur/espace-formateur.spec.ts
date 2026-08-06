import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceFormateur } from './espace-formateur';

describe('EspaceFormateur', () => {
  let component: EspaceFormateur;
  let fixture: ComponentFixture<EspaceFormateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceFormateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceFormateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
