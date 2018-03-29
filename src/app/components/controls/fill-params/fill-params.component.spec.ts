import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FillParamsComponent} from './fill-params.component';

describe('FillParamsComponent', () => {
  let component: FillParamsComponent;
  let fixture: ComponentFixture<FillParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FillParamsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
