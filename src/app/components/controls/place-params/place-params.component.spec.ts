import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceParamsComponent} from './place-params.component';

describe('PlaceParamsComponent', () => {
  let component: PlaceParamsComponent;
  let fixture: ComponentFixture<PlaceParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceParamsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
