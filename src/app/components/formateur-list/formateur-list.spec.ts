import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurList } from './formateur-list';

describe('FormateurList', () => {
  let component: FormateurList;
  let fixture: ComponentFixture<FormateurList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateurList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
