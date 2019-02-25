import { Mower } from './mower.model';
import { MowerPosition } from './interfaces/mower-position.interface';
import { LawnField } from './interfaces/lawn-field.interface';
import { BehaviorSubject, Observable } from 'rxjs';

export class Lawn {
    maxX: number;
    maxY: number;
    fieldMap: LawnField[] = [];
    mowers: Mower[] = [];
    mowerBSubj: BehaviorSubject<LawnField[]>;

    constructor(maxX: string = '5', maxY: string = '5') {
        this.maxX = parseInt(maxX, 10);
        this.maxY = parseInt(maxY, 10);

        // map fields
        for (let i = this.maxX; i >= 0; i--) {
            for (let j = 0; j <= this.maxY; j++) {
                let lawnFieldCoord: LawnField = {
                    position: {
                        x: j + '',
                        y: i + ''
                    }
                }
                this.fieldMap.push(lawnFieldCoord);
            }
        }

        this.mowerBSubj = new BehaviorSubject(this.fieldMap);
    }

    setMower(mower: Mower) {
        this.fieldMap.forEach((field: LawnField) => {
            if (field.position.x === mower.mowerPostion.x
                && field.position.y === mower.mowerPostion.y) {
                field.mower = mower;
            }
        });

        this.mowerBSubj.next(this.fieldMap);
    }

    removeMower(mower: Mower) {
        this.fieldMap.forEach((field: LawnField) => {
            if (field.position.x === mower.mowerPostion.x
                && field.position.y === mower.mowerPostion.y) {
                delete field.mower;
            }
        });

        this.mowerBSubj.next(this.fieldMap);
    }

    getMowerObs(): Observable<LawnField[]> {
        return this.mowerBSubj.asObservable();
    }

}