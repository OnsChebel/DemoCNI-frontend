import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceParticipant } from './espace-participant';

describe('EspaceParticipant', () => {
  let component: EspaceParticipant;
  let fixture: ComponentFixture<EspaceParticipant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceParticipant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceParticipant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
