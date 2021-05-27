// Interface
import { IBalanceService } from '../common/interfaces/services';
import { IBalanceRepository } from '../common/interfaces/dal/walletRepository';
import { IBalance } from '../common/interfaces/domain';
import { IBalanceModel } from '../common/interfaces/dal/walletRepository';
import { IBalanceCreateDto, IBalanceUpdateDto  } from '../common/interfaces/dtos/balance.dto';

// Class
import { ApplicationException } from '../common/libs/exceptions/application.exception';
import { IBalanceMapperDB } from '../common/interfaces/dal/walletRepository/balanceRepository';

export class BalanceService implements IBalanceService {

    constructor(
        private readonly balanceRepository: IBalanceRepository,
        private readonly balanceMapperDB: IBalanceMapperDB
    ) {}

    public async create(balanceDto: IBalanceCreateDto): Promise<void> {
       // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.
       const balance: IBalanceModel = this.balanceMapperDB.fromCreateDtoToEntityModel(balanceDto);

       await this.balanceRepository.save(balance);
    }

    public async update(id: number, balanceDto: IBalanceUpdateDto): Promise<void> {
        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.
        const balanceExists = await this.balanceRepository.findById(id);

        if(!balanceExists) {
            throw new ApplicationException(`No balance found for id ${id}.`)
        }

        const balance: IBalanceModel = this.balanceMapperDB.fromUpdateDtoToEntityModel(balanceDto);
       
        await this.balanceRepository.updateById(id, balance);
    }

    public async find(id: number): Promise<IBalance> {
        const balance = await this.balanceRepository.findById(id) as IBalanceModel;
        // [TODO]: Mapear IBalanceModel a entidad de Dominio IBalance utilizando un Mapper.
        return balance as IBalance;
    }

    public async findAll(): Promise<IBalance[]> {
        const balance = await this.balanceRepository.all() as IBalanceModel[];
        // [TODO]: Mapear IBalanceModel a entidad de Dominio IBalance utilizando un Mapper.
        return balance as IBalance[];
    }

    public async delete(id: number): Promise<void> {
        await this.balanceRepository.deleteById(id);
    }

}