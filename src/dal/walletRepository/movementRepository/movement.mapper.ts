import { IMovementModel } from '../../../common/interfaces/dal/walletRepository';
import { IMovementMapperDB } from '../../../common/interfaces/dal/walletRepository/movementRepository';
import { IMovementCreateDto, IMovementUpdateDto } from '../../../common/interfaces/dtos/movement.dto';

export class MovementMapperDB implements IMovementMapperDB {

    constructor() {}

    fromCreateDtoToEntityModel(movementDto: IMovementCreateDto): IMovementModel  {
        const balanceModel = { ...movementDto, created_at: new Date() };
        return balanceModel as IMovementModel
    }

    fromUpdateDtoToEntityModel(movementDto: IMovementUpdateDto): IMovementModel  {
        const balanceModel = { ...movementDto, updated_at: new Date() };
        return balanceModel as IMovementModel
    }

}

