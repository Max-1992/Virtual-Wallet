import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { ISubscriptionService } from '../../common/interfaces/services';
import { ISubscriptionCreateDto, ISubscriptionUpdateDto } from '../../common/interfaces/dtos/subscription.dto';

@route('/subscriptions')
export class SubscriptionController {

    constructor(private readonly subscriptionService: ISubscriptionService) {}

    @GET()
    public async all(req: Request, res: Response): Promise<void>  {
        try {
            const data = await this.subscriptionService.findAll();
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
            const data = await this.subscriptionService.find(id);
            res.send(data); 
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    @POST()
    public async create(req: Request, res: Response): Promise<void>  {
        try {
            const { user_id, code, amount, cron } = req.body;
            const subscriptionDto: ISubscriptionCreateDto = { user_id, code, amount, cron };
            await this.subscriptionService.create(subscriptionDto);
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
            const { code, amount, cron } = req.body;
            const subscriptionDto: ISubscriptionUpdateDto = { code, amount, cron };
            await this.subscriptionService.update(id, subscriptionDto);
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
            await this.subscriptionService.delete(id);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }

    }
}
