// Import interface
import { ISubscriptionCreateDto, ISubscriptionUpdateDto } from "../../../dtos/subscription.dto";
import { ISubscriptionModel } from "./ISubscription.model";

export interface ISubscriptionMapperDB {
    fromCreateDtoToEntityModel(subscriptionDto: ISubscriptionCreateDto): ISubscriptionModel
    fromUpdateDtoToEntityModel(subscriptionDto: ISubscriptionUpdateDto): ISubscriptionModel
}