import { MovementType } from '../enum/movement.enum'

export interface IMovementCreateDto {
    user_id: number;
    type: MovementType;
    amount: number;
}

export interface IMovementUpdateDto {
    type: MovementType;
    amount: number;
}