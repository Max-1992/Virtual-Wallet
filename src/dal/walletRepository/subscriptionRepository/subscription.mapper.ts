import { ISubscriptionModel } from '../../../common/interfaces/dal/walletRepository';
import { ISubscriptionMapperDB } from '../../../common/interfaces/dal/walletRepository/subscriptionRepository/ISubscription.mapper';
import { ISubscriptionUpdateDto, ISubscriptionCreateDto } from '../../../common/interfaces/dtos/subscription.dto';

export class SubscriptionMapperDB implements ISubscriptionMapperDB {

    constructor() {}

    fromCreateDtoToEntityModel(subscriptionDto: ISubscriptionCreateDto): ISubscriptionModel  {
        const subscriptionModel = { ...subscriptionDto, created_at: new Date() };
        return subscriptionModel as ISubscriptionModel
    }

    fromUpdateDtoToEntityModel(subscriptionDto: ISubscriptionUpdateDto): ISubscriptionModel  {
        const subscriptionModel = { ...subscriptionDto, updated_at: new Date() };
        return subscriptionModel as ISubscriptionModel
    }

}