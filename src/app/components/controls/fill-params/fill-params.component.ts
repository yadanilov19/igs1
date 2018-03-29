import {Component, OnInit} from '@angular/core';
import {FillTypes} from '../../../classes/fill-types.enum';
import {ShapeService} from "../../services/shape/shape.service";

@Component({
  selector: 'app-fill-params',
  templateUrl: './fill-params.component.html',
  styleUrls: ['./fill-params.component.css']
})
export class FillParamsComponent implements OnInit {
  FillParams: { type: FillTypes, SortByZ: boolean } = {
    type: FillTypes.Flat,
    SortByZ: true
  };

  constructor(private sh: ShapeService) {
  }

  ngOnInit() {
  }

  SetType(type: FillTypes) {
    this.FillParams.type = type;
  }

  SendEvent() {
    this.sh.FillParams.next(this.FillParams);
  }

}
