import { IBalanceModel } from '../../../common/interfaces/dal/walletRepository';
import { IBalanceMapperDB } from '../../../common/interfaces/dal/walletRepository/balanceRepository';
import { IBalanceCreateDto, IBalanceUpdateDto } from '../../../common/interfaces/dtos/balance.dto';

export class BalanceMapperDB implements IBalanceMapperDB {

    constructor() {}

    fromCreateDtoToEntityModel(balanceDto: IBalanceCreateDto): IBalanceModel  {
        const balanceModel = { ...balanceDto, created_at: new Date() };
        return balanceModel as IBalanceModel
    }

    fromUpdateDtoToEntityModel(balanceDto: IBalanceUpdateDto): IBalanceModel  {
        const balanceModel = { ...balanceDto, updated_at: new Date() };
        return balanceModel as IBalanceModel
    }

}