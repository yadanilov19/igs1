import {Component, OnInit} from '@angular/core';
import {ShapeService} from '../../services/shape/shape.service';

@Component({
  selector: 'app-shape-selector',
  templateUrl: './shape-selector.component.html',
  styleUrls: ['./shape-selector.component.css']
})
export class ShapeSelectorComponent implements OnInit {
  Shapes: any[];
  SelectedShape: any;

  constructor(public shapeService: ShapeService) {
    this.Shapes = shapeService.AvalibleShapes;
    this.SelectedShape = shapeService.CurrentShape;
  }

  ngOnInit() {
  }

}
