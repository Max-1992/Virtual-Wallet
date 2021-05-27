import { ISubscriptionModel } from './ISubscription.model';

export interface ISubscriptionRepository {
    all(): Promise<ISubscriptionModel[]>
    findById(id: number): Promise<ISubscriptionModel | null>
    findByUserAndCode(user_id: number, code: string): Promise<ISubscriptionModel | null> 
    save(subscriptor: ISubscriptionModel): Promise<void>
    updateById(id: number, subscriptor: ISubscriptionModel): Promise<void>
    deleteById(id: number): Promise<void>
}




