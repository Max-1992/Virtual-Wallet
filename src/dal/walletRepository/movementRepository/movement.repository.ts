// Import interface
import { IMovementRepository, IMovementModel } from './../../../common/interfaces/dal/walletRepository';

// Import connection database
import connection from '../connection';

export class MovementRepository implements IMovementRepository {

    public async all(): Promise<IMovementModel[]> {
        const [rows] =  await connection.execute(
            `SELECT * FROM wallet_movement ORDER BY id DESC`
        );

        return rows as IMovementModel[];
    }

    public async findById(id: number): Promise<IMovementModel | null> {
        const [rows]: any[] = await connection.execute(
            'SELECT * FROM wallet_movement WHERE id = ?', [id]
        );

        if(rows.length === 0) return null;

        return rows[0] as IMovementModel;
    }

    public async save(movement: IMovementModel): Promise<void> {
        await connection.execute(
            `INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)`, 
            [movement.user_id, movement.type, movement.amount, movement.created_at]
        );
    }

    public async updateById(id: number, movement: IMovementModel): Promise<void> {
        await connection.execute(
            `UPDATE wallet_movement SET  amount = ?, type = ?, updated_at = ? WHERE id = ?`, 
            [movement.amount, movement.type, movement.updated_at, id]
        );
    }

    public async deleteById(id: number): Promise<void> {
        await connection.execute(`DELETE FROM wallet_movemente WHERE id = ?`, [id]);
    }

}