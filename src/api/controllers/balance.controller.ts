import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IBalanceService } from '../../common/interfaces/services';
import { IBalanceCreateDto, IBalanceUpdateDto } from '../../common/interfaces/dtos/balance.dto';

@route('/balances')
export class BalanceController {

    constructor(private readonly balanceService: IBalanceService) {}

    @GET()
    public async all(req: Request, res: Response): Promise<void>  {
        try {
            const data = await this.balanceService.findAll();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const data = await this.balanceService.find(id);
            res.send(data); 
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    @POST()
    public async create(req: Request, res: Response): Promise<void>  {
        try {
            const { user_id, amount } = req.body;
            const balanceDto: IBalanceCreateDto = { user_id, amount };
            await this.balanceService.create(balanceDto);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>  {
        try {
            const id = parseInt(req.params.id);
            const { amount } = req.body;
            const balanceDto: IBalanceUpdateDto = { amount };
            await this.balanceService.update(id, balanceDto);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    @route('/:id')
    @DELETE()
    public async delete(req: Request, res: Response): Promise<void>  {
        try {
            const id = parseInt(req.params.id);
            await this.balanceService.delete(id);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }

    }
}
