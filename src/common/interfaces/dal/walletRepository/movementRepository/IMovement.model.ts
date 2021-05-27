// Import Enum
import { MovementType } from '../../../enum/movement.enum'

export interface IMovementModel {
    id: number;
    user_id: number;
    type: MovementType;
    amount: number;
    created_at?: Date;
    updated_at?: Date;
}