import {Component, OnInit} from '@angular/core';
import {ShapeService} from '../../services/shape/shape.service';

@Component({
  selector: 'app-move-by-axis',
  templateUrl: './move-by-axis.component.html',
  styleUrls: ['./move-by-axis.component.css']
})
export class MoveByAxisComponent implements OnInit {
  x = 0;
  y = 0;
  z = 0;

  constructor(private shapeService: ShapeService) {

  }

  ngOnInit() {
  }

  SendEvent(axis) {
    const data = {
      x: this.x, y: this.y, z: this.z
    };
    data[axis] = this[axis];
    this.shapeService.axisMoveChange.next(data);
  }

}
