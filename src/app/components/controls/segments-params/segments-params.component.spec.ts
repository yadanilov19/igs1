import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SegmentsParamsComponent} from './segments-params.component';

describe('SegmentsParamsComponent', () => {
  let component: SegmentsParamsComponent;
  let fixture: ComponentFixture<SegmentsParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentsParamsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentsParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
