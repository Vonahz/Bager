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
  readFromFileBool: boolean = false;
  lawnType: 'manual' | 'file';
  lawnMowerData: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  createLawn(x: string, y: string) {
    this.lawn = new Lawn(x, y);
    this.createLawnIsClicked = true;
  }

  selectFile(event) {
    this.lawnType = 'file';

    let fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0]);
    fileReader.onloadend = (e) => {
      let fileText = fileReader.result.toString();
      let fileLines = fileText.split('\n');

      let lawnSize = fileLines[0].trim().split(' ');
      this.lawn = new Lawn(lawnSize[0], lawnSize[1])
      this.lawnMowerData = fileLines.splice(1, fileLines.length);
      this.createLawnIsClicked = true;
    };
  }

}
