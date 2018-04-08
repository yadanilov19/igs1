import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MoveByAxisComponent} from './move-by-axis.component';

describe('MoveByAxisComponent', () => {
  let component: MoveByAxisComponent;
  let fixture: ComponentFixture<MoveByAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoveByAxisComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveByAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
