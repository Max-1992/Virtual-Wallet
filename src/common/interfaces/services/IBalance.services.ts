// Import Interface
import { IBalanceCreateDto, IBalanceUpdateDto } from '../dtos/balance.dto';
import { IBalance } from '../domain';

export interface IBalanceService {
    create(balance: IBalanceCreateDto): Promise<void>
    update(id: number, balance: IBalanceUpdateDto): Promise<void>
    delete(id: number): Promise<void>
    findAll(): Promise<IBalance[]>
    find(id: number): Promise<IBalance>
}
