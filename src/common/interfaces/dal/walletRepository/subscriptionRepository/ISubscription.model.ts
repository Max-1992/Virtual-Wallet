export interface ISubscriptionModel {
    id: number;
    code: string;
    user_id: number;
    amount: number;
    cron: string;
    created_at?: Date;
    updated_at?: Date;
}