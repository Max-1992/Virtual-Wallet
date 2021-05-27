// Import interface
import { IBalanceRepository, IBalanceModel } from './../../../common/interfaces/dal/walletRepository';

// Import connection database
import connection from '../connection';

export class BalanceRepository implements IBalanceRepository {

    public async all(): Promise<IBalanceModel[]> {
        const [rows] =  await connection.execute(
            `SELECT * FROM wallet_balance ORDER BY id DESC`
        );

        return rows as IBalanceModel[];
    }

    public async findById(id: number): Promise<IBalanceModel | null> {
        const [rows]: any[] = await connection.execute(
            'SELECT * FROM wallet_balance WHERE id = ?', [id]
        );

        if(rows.length === 0) return null;

        return rows[0] as IBalanceModel;
    }

    public async findByUserId(userId: number): Promise<IBalanceModel | null> {
        const [rows]: any[] = await connection.execute(
            'SELECT * FROM wallet_balance WHERE user_id = ?', [userId]
        );

        if(rows.length === 0) return null;

        return rows[0] as IBalanceModel;
    }

    public async save(balnce: IBalanceModel): Promise<void> {
        await connection.execute(
            `INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)`, 
            [balnce.user_id, balnce.amount, balnce.created_at]
        );
    }

    public async updateById(id: number, balance: IBalanceModel): Promise<void> {
        await connection.execute(
            `UPDATE wallet_balance SET  amount = ?, updated_at = ? WHERE id = ?`, 
            [balance.amount, balance.updated_at, id]
        );
    }

    public async deleteById(id: number): Promise<void> {
        await connection.execute(`DELETE FROM wallet_balance WHERE id = ?`, [id]);
    }

}