import {Component, OnInit} from '@angular/core';
import {FillTypes} from '../../../classes/fill-types.enum';
import {ShapeService} from "../../services/shape/shape.service";

@Component({
  selector: 'app-fill-params',
  templateUrl: './fill-params.component.html',
  styleUrls: ['./fill-params.component.css']
})
export class FillParamsComponent implements OnInit {
  FillParams: { type: FillTypes } = {
    type: FillTypes.Stroke
  };

  constructor(private sh: ShapeService) {
  }

  ngOnInit() {

  }

  SetType(type: FillTypes) {
    this.FillParams.type = type;
    this.sh.FillParams.next(this.FillParams);
  }

}
