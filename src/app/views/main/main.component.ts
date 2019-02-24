import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lawn } from 'src/app/models/lawn.model';
import { MowerPosition } from 'src/app/models/interfaces/mower-position.interface';
import { Mower } from 'src/app/models/mower.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  lawn: Lawn;
  createLawnIsClicked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  createLawn(x: string, y: string) {
    this.lawn = new Lawn(x, y);
    this.createLawnIsClicked = true;
  }

}
