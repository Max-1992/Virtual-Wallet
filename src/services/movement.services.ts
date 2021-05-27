// Interface
import { IMovementService } from '../common/interfaces/services';
import { IBalanceModel, IBalanceRepository, IMovementRepository } from '../common/interfaces/dal/walletRepository';
import { IMovement } from '../common/interfaces/domain';
import { IMovementModel } from '../common/interfaces/dal/walletRepository';
import { IMovementCreateDto } from '../common/interfaces/dtos/movement.dto';

// Class
import { ApplicationException } from '../common/libs/exceptions/application.exception';
import { IMovementMapperDB, IBalanceMapperDB } from '../common/interfaces/dal/walletRepository';
import { IBalanceCreateDto, IBalanceUpdateDto } from '../common/interfaces/dtos/balance.dto';
import { MovementType } from '../common/interfaces/enum/movement.enum';

export class MovementService implements IMovementService {

    constructor(
        private readonly movementRepository: IMovementRepository,
        private readonly balanceRepository: IBalanceRepository,
        private readonly movementMapperDB: IMovementMapperDB,
        private readonly balanceMapperDB: IBalanceMapperDB
    ) {}

    public async create(movementDto: IMovementCreateDto): Promise<void> {

       const balance: IBalanceModel | null = await this.balanceRepository.findByUserId(movementDto.user_id);

       // If movementDto.type === MovementType.income execute income
       if( movementDto.type === MovementType.income ) {
            await this.income(movementDto, balance);
       }

       // If movementDto.type === MovementType.outcom execute outcom
       if( movementDto.type === MovementType.outcome ) {
            await this.outcome(movementDto, balance);
       }

       const movement = this.movementMapperDB.fromCreateDtoToEntityModel(movementDto) as IMovementModel;
       await this.movementRepository.save(movement);
    }

    public async find(id: number): Promise<IMovement> {
        const movement = await this.movementRepository.findById(id) as IMovementModel;
        // [TODO]: Mapear IMovementModel a entidad de Dominio IMovement utilizando un Mapper.
        return movement as IMovement;
    }

    public async findAll(): Promise<IMovement[]> {
        const movement = await this.movementRepository.all() as IMovementModel[];
        // [TODO]: Mapear IMovementModel a entidad de Dominio IMovement utilizando un Mapper.
        return movement as IMovement[];
    }

    public async delete(id: number): Promise<void> {
        await this.movementRepository.deleteById(id);
    }

    private async income(movementDto: IMovementCreateDto, balance: IBalanceModel | null) {

        // Si no existe balance hay que crearlo, si existe actualizamos el valor del amout.
        if(!balance) {
            const balanceDto = {user_id: movementDto.user_id, amount: movementDto.amount} as IBalanceCreateDto;
            balance = this.balanceMapperDB.fromCreateDtoToEntityModel(balanceDto) as IBalanceModel;
            await this.balanceRepository.save(balance);
        } else {
            balance.amount += movementDto.amount;
            balance = this.balanceMapperDB.fromUpdateDtoToEntityModel(balance) as IBalanceModel;
            await this.balanceRepository.updateById(balance.id, balance);
        }
    }

    private async outcome(movementDto: IMovementCreateDto, balance: IBalanceModel | null) {

        // Validar si el usuario posee saldo.
        if(!balance) {
            throw new ApplicationException(`The user does not have a balance entered.`);
        }

        // validar si el usuario posee el suficiente saldo disponible.
        if(balance.amount < movementDto.amount) {
            throw new ApplicationException(`The user does not have enough balance.`);
        }

        balance.amount -= movementDto.amount;
        await this.balanceRepository.updateById(balance.id, balance);
    }

}