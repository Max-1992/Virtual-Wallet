// Import Interface
import { IMovementCreateDto } from '../dtos/movement.dto';
import { IMovement } from '../domain';

export interface IMovementService {
    create(balance: IMovementCreateDto): Promise<void>
    delete(id: number): Promise<void>
    findAll(): Promise<IMovement[]>
    find(id: number): Promise<IMovement>
}
