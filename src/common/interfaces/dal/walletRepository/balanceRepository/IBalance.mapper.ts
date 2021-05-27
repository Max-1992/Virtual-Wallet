// Import interface
import { IBalanceCreateDto, IBalanceUpdateDto } from "../../../dtos/balance.dto";
import { IBalanceModel } from "./IBalance.model";

export interface IBalanceMapperDB {
    fromCreateDtoToEntityModel(balanceDto: IBalanceCreateDto): IBalanceModel
    fromUpdateDtoToEntityModel(balanceDto: IBalanceUpdateDto): IBalanceModel
}