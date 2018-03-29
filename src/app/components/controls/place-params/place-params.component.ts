import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShapeService} from "../../services/shape/shape.service";
import {ShapeBase} from "../../../classes/shapes";

@Component({
  selector: 'app-place-params',
  templateUrl: './place-params.component.html',
  styleUrls: ['./place-params.component.css']
})
export class PlaceParamsComponent implements OnInit {
  PlaceParams = {
    a: {
      min: 0,
      max: 200,
      cur: 0
    },
    b: {
      min: 0,
      max: 200,
      cur: 0
    }
  };

  constructor(private sh: ShapeService) {
    this.PlaceParams.a.cur = this.sh.CurrentShape.value.a;
    this.PlaceParams.b.cur = this.sh.CurrentShape.value.b;
  }

  ngOnInit() {
    this.sh.ShapeChange.subscribe((shape) => {
      this.PlaceParams.a.cur = shape.value.a;
      this.PlaceParams.b.cur = shape.value.b;
    });
  }

  SendEvent() {
    this.sh.PlaceParams.next(this.PlaceParams);
  }
}
