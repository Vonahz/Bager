import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Lawn } from 'src/app/models/lawn.model';
import { Subscription } from 'rxjs';
import { LawnField } from 'src/app/models/lawn-field.interface';
import { Mower } from 'src/app/models/mower.model';
import { MowerPosition } from 'src/app/models/mower-position.interface';
import { Direction } from 'src/app/models/types/direction.type';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.scss']
})
export class LawnComponent implements OnInit, OnDestroy {
  @Input() lawn: Lawn;

  maxColumns: number = 0;
  maxRows: number = 0;

  lawnFields: LawnField[] = [];
  mowerSub: Subscription = new Subscription();

  mowers: Mower[] = [];

  constructor() { }

  ngOnInit() {
    this.maxColumns = this.lawn.maxY;
    this.maxRows = this.lawn.maxX;
    this.subscribeToData();
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

  makeNewRow(field: LawnField): boolean {
    if (parseInt(field.position.y) === this.maxColumns - 1) {
      return true;
    }
  }

  addMower(initPos: MowerPosition) {
    let mower = new Mower(initPos);
    this.lawn.setMower(mower);
  }

  moveMower(input, mower: Mower) {
    this.lawn.removeMower(mower);
    let lettersArray = input.value.split('');
    lettersArray.forEach(command => {
      switch (command) {
        case 'F': {
          this.moveHandler(mower);
          mower.move(mower.mowerPostion);
          break;
        }
        case 'L': {
          mower.mowerPostion.direction = this.directionHandler('L', mower.mowerPostion.direction);
          mower.move(mower.mowerPostion);
          break;
        }
        case 'R': {
          mower.mowerPostion.direction = this.directionHandler('R', mower.mowerPostion.direction);
          mower.move(mower.mowerPostion);
          break;
        }
        default: {
          console.error('unknown command');
        }
      }
    })
    this.lawn.setMower(mower);
    input.value = '';
  }

  moveHandler(mower: Mower): void {
    switch (mower.mowerPostion.direction) {
      case 'N': {
        mower.mowerPostion.x = (parseInt(mower.mowerPostion.x, 10) + 1) + '';
        break;
      }
      case 'S': {
        mower.mowerPostion.x = (parseInt(mower.mowerPostion.x, 10) - 1) + '';
        break;
      }
      case 'E': {
        mower.mowerPostion.y = (parseInt(mower.mowerPostion.y, 10) + 1) + '';
        break;
      }
      case 'W': {
        mower.mowerPostion.y = (parseInt(mower.mowerPostion.y, 10) - 1) + '';
        break;
      }
    }
  }

  directionHandler(turn: 'R' | 'L', mowerFace: Direction): Direction {
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