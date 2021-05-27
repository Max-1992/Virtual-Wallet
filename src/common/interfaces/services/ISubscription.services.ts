// Import Interface
import { ISubscriptionCreateDto, ISubscriptionUpdateDto } from '../dtos/subscription.dto';
import { ISubscription } from './../domain';

export interface ISubscriptionService {
    create(subscription: ISubscriptionCreateDto): Promise<void>
    update(id: number, subscription: ISubscriptionUpdateDto): Promise<void>
    delete(id: number): Promise<void>
    findAll(): Promise<ISubscription[]>
    find(id: number): Promise<ISubscription>
}