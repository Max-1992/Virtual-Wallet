// Import interface
import { ISubscriptionModel, ISubscriptionRepository } from './../../../common/interfaces/dal/walletRepository';

// Import connection database
import connection from '../connection';

export class SubscriptionRepository implements ISubscriptionRepository {

    public async all(): Promise<ISubscriptionModel[]> {
        const [rows] =  await connection.execute(
            `SELECT * FROM wallet_subscription ORDER BY id DESC`
        );

        return rows as ISubscriptionModel[];
    }

    public async findById(id: number): Promise<ISubscriptionModel | null> {
        const [rows]: any[] = await connection.execute(
            'SELECT * FROM wallet_subscription WHERE id = ?', [id]
        );

        if(rows.length === 0) return null;

        return rows[0] as ISubscriptionModel;
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<ISubscriptionModel | null> {
        const [rows]: any[] = await connection.execute(
            `SELECT * FROM wallet_subscription WHERE 'user_id' = ? AND 'code' = ?`, [user_id, code]
        );

        if(rows.length === 0) return null;

        return rows[0] as ISubscriptionModel;
    }


    public async save(subscriptor: ISubscriptionModel): Promise<void> {
        await connection.execute(
            `INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)`, 
            [subscriptor.user_id, subscriptor.code, subscriptor.amount, subscriptor.cron, subscriptor.created_at]
        );
    }

    public async updateById(id: number, subscriptor: ISubscriptionModel): Promise<void> {
        await connection.execute(
            `UPDATE wallet_subscription SET code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?`, 
            [subscriptor.code, subscriptor.amount, subscriptor.cron, subscriptor.updated_at, id]
        );
    }

    public async deleteById(id: number): Promise<void> {
        await connection.execute(`DELETE FROM wallet_subscription WHERE id = ?`, [id]);
    }

}