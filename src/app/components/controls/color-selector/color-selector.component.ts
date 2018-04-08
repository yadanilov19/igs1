import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShapeService} from '../../services/shape/shape.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {
  current = 'front';
  Colors = {
    front: {
      r: 100,
      g: 100,
      b: 100,
    },
    back: {
      r: 255,
      g: 100,
      b: 255,
    }
  };

  constructor(private sh: ShapeService) {
  }

  ngOnInit() {
    this.sh.ColorChange.next(this.Colors);
  }

  SendEvent() {
    this.sh.ColorChange.next(this.Colors);
  }

  ChangeTab(tabNum) {
    this.current = tabNum;
  }

  getRGB(color) {
    return `rgb(${color.r},${color.g},${color.b})`;
  }
}
