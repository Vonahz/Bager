import { MowerPosition } from './interfaces/mower-position.interface';

let id: number = 1;
export class Mower {
    id: number;
    mowerPostion: MowerPosition = {
        x: '0',
        y: '0',
        direction: 'N'
    };

    constructor(initPos: MowerPosition) {
        this.id = id++;
        this.mowerPostion = initPos;
    }

    move(pos: MowerPosition): MowerPosition {
        this.mowerPostion = pos;

        return this.mowerPostion;
    }
}