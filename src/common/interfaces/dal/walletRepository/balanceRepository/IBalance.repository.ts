import { IBalanceModel } from './IBalance.model';

export interface IBalanceRepository {
    all(): Promise<IBalanceModel[]>
    findById(id: number): Promise<IBalanceModel | null>
    findByUserId(userId: number): Promise<IBalanceModel | null>
    save(balance: IBalanceModel): Promise<void>
    updateById(id: number, balance: IBalanceModel): Promise<void>
    deleteById(id: number): Promise<void>
}




