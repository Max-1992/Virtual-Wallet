// Interface
import { ISubscriptionService } from '../common/interfaces/services';
import { ISubscriptionRepository } from '../common/interfaces/dal/walletRepository';
import { ISubscription } from '../common/interfaces/domain';
import { ISubscriptionModel } from '../common/interfaces/dal/walletRepository';
import { ISubscriptionCreateDto, ISubscriptionUpdateDto } from '../common/interfaces/dtos/subscription.dto';

// Class
import { ApplicationException } from '../common/libs/exceptions/application.exception';
import { ISubscriptionMapperDB } from '../common/interfaces/dal/walletRepository/subscriptionRepository/ISubscription.mapper';

export class SubscriptionService implements ISubscriptionService {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly subscriptionMapperDB: ISubscriptionMapperDB
    ) {}

    public async create(subscriptionDto: ISubscriptionCreateDto): Promise<void> {

        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.

       const subscriptionExists = await this.subscriptionRepository.findByUserAndCode(subscriptionDto.user_id, subscriptionDto.code);

       if(subscriptionExists) {
            throw new ApplicationException('User subscription al ready exists.');
       }

       const subscription: ISubscriptionModel = this.subscriptionMapperDB.fromCreateDtoToEntityModel(subscriptionDto);

       await this.subscriptionRepository.save(subscription);
    }

    public async update(id: number, subscriptionDto: ISubscriptionUpdateDto): Promise<void> {

        // [TODO]: Mapear DTO a entidad de Dominio utilizando un Mapper.

        const subscriptionExists = await this.subscriptionRepository.findById(id);

        if(!subscriptionExists) {
            throw new ApplicationException(`No subscription found for id ${id}.`)
       }

       const subscription: ISubscriptionModel = this.subscriptionMapperDB.fromUpdateDtoToEntityModel(subscriptionDto);
       
        await this.subscriptionRepository.updateById(id, subscription);
    }

    public async find(id: number): Promise<ISubscription> {
        const subscription = await this.subscriptionRepository.findById(id) as ISubscriptionModel;
        // [TODO]: Mapear ISubscriptionModel a entidad de Dominio ISubscription utilizando un Mapper.
        return subscription as ISubscription;
    }

    public async findAll(): Promise<ISubscription[]> {
        const subscription = await this.subscriptionRepository.all() as ISubscriptionModel[];
        // [TODO]: Mapear ISubscriptionModel a entidad de Dominio ISubscription utilizando un Mapper.
        return subscription as ISubscription[];
    }

    public async delete(id: number): Promise<void> {
        await this.subscriptionRepository.deleteById(id);
    }

}