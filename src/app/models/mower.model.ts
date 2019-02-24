import { MowerPosition } from './mower-position.interface';

export class Mower {
    mowerPostion: MowerPosition;

    constructor(initPos: MowerPosition) {
        this.mowerPostion = initPos;
    }

    move(pos: MowerPosition): MowerPosition {
        this.mowerPostion = pos;

        return this.mowerPostion;
    }
}