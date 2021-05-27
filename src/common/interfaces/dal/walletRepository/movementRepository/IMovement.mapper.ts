// Import interface
import { IMovementCreateDto, IMovementUpdateDto } from "../../../dtos/movement.dto";
import { IMovementModel } from "./IMovement.model";

export interface IMovementMapperDB {
    fromCreateDtoToEntityModel(movementDto: IMovementCreateDto): IMovementModel
    fromUpdateDtoToEntityModel(movementDto: IMovementUpdateDto): IMovementModel
}