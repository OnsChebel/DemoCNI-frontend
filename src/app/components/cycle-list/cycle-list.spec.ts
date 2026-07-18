import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleList } from './cycle-list';

describe('CycleList', () => {
  let component: CycleList;
  let fixture: ComponentFixture<CycleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
