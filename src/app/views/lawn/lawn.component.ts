import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Lawn } from 'src/app/models/lawn.model';
import { Subscription } from 'rxjs';
import { LawnField } from 'src/app/models/interfaces/lawn-field.interface';
import { Mower } from 'src/app/models/mower.model';
import { MowerPosition } from 'src/app/models/interfaces/mower-position.interface';
import { Direction } from 'src/app/models/types/direction.type';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.scss']
})
export class LawnComponent implements OnInit, OnDestroy {
  @Input() lawn: Lawn;
  @Input() readFromFile: boolean = false;
  @Input() mowerData: string[] = [];

  maxColumns: number = 0;
  maxRows: number = 0;

  lawnFields: LawnField[] = [];
  mowerSub: Subscription = new Subscription();

  mowers: Mower[] = [];

  constructor() { }

  ngOnInit() {
    this.maxColumns = this.lawn.maxX;
    this.maxRows = this.lawn.maxY;
    this.subscribeToData();

    if (this.mowerData.length > 0) {
      this.createMowersFromFile();
    }
  }

  subscribeToData(): any {
    this.mowerSub = this.lawn.getMowerObs().subscribe((fields: LawnField[]) => {
      this.lawnFields = fields;

      this.mowers = [];
      fields.forEach((field: LawnField) => {
        if (field.mower) this.mowers.push(field.mower);
      })
    });
  }

  createMowersFromFile(): void {
    this.mowerData.forEach((mowerData, index) => {
      if (index % 2 === 0) {
        let mowerOptions = mowerData.split(' ');
        this.mowers.push(this.addMower({ x: mowerOptions[0], y: mowerOptions[1], direction: <Direction>mowerOptions[2] }));
      }
    });
  }

  moveAllMowers(): void {
    this.mowerData.forEach((mowerData, index) => {
      if (index % 2 > 0) {
        this.moveMower(mowerData, this.mowers[index - 1]);
      }
    });
  }

  makeNewRow(field: LawnField): boolean {
    if (parseInt(field.position.x, 10) === this.lawn.maxX) {
      return true;
    }
  }

  addMower(initPos: MowerPosition): Mower {
    let mower = new Mower(initPos);
    this.lawn.setMower(mower);
    return mower;
  }

  moveMower(input, mower: Mower) {
    this.lawn.removeMower(mower);
    let lettersArray = input.split('');
    lettersArray.forEach(command => {
      switch (command) {
        case 'F': {
          this.moveHandler(mower);
          mower.move(mower.mowerPostion);
          break;
        }
        case 'L': {
          mower.mowerPostion.direction = this.directionChanger('L', mower.mowerPostion.direction);
          mower.move(mower.mowerPostion);
          break;
        }
        case 'R': {
          mower.mowerPostion.direction = this.directionChanger('R', mower.mowerPostion.direction);
          mower.move(mower.mowerPostion);
          break;
        }
        default: {
          console.error('unknown command');
        }
      }
    })
    this.lawn.setMower(mower);
  }

  moveHandler(mower: Mower): void {
    let x = parseInt(mower.mowerPostion.x, 10);
    let y = parseInt(mower.mowerPostion.y, 10);
    if (!this.moveIsPossible(mower, x, y)) {
      console.error('Cannot move there');
      return;
    }
    switch (mower.mowerPostion.direction) {
      case 'N': {
        mower.mowerPostion.y = (y + 1) + '';
        break;
      }
      case 'S': {
        mower.mowerPostion.y = (y - 1) + '';
        break;
      }
      case 'E': {
        mower.mowerPostion.x = (x + 1) + '';
        break;
      }
      case 'W': {
        mower.mowerPostion.x = (x - 1) + '';
        break;
      }
    }
  }

  moveIsPossible(mower: Mower, x: number, y: number): boolean {
    switch (mower.mowerPostion.direction) {
      case 'N': {
        if (y < this.lawn.maxY) return true;
        break;
      }
      case 'S': {
        if (y > 0) return true;
        break;
      }
      case 'E': {
        if (x < this.lawn.maxX) return true;
        break;
      }
      case 'W': {
        if (x > 0) return true;
        break;
      }
      default: return false;
    }
  }

  directionChanger(turn: 'R' | 'L', mowerFace: Direction): Direction {
    let mappedDirectionsWithRotationToRight = {
      'N': 'E',
      'E': 'S',
      'S': 'W',
      'W': 'N'
    };

    let mappedDirectionsWithRotationToLeft = {
      'E': 'N',
      'S': 'E',
      'W': 'S',
      'N': 'W'
    };

    return (turn === 'R') ? <Direction>mappedDirectionsWithRotationToRight[mowerFace] : <Direction>mappedDirectionsWithRotationToLeft[mowerFace];
  }

  ngOnDestroy() {
    this.mowerSub.unsubscribe();
  }
}
