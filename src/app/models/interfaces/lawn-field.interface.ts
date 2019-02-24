import { Mower } from '../mower.model';

export interface LawnField {
    position: {
        x: string
        y: string
    },
    mower?: Mower
}