import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DrawPlaceComponent} from './draw-place.component';

describe('DrawPlaceComponent', () => {
  let component: DrawPlaceComponent;
  let fixture: ComponentFixture<DrawPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawPlaceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
