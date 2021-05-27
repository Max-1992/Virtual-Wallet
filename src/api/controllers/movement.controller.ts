import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';

// Import interface
import { IMovementService } from '../../common/interfaces/services';
import { IMovementCreateDto, IMovementUpdateDto } from '../../common/interfaces/dtos/movement.dto';

@route('/movements')
export class MovementController {

    constructor(private readonly movementService: IMovementService) {}

    @GET()
    public async all(req: Request, res: Response): Promise<void>  {
        try {
            const data = await this.movementService.findAll();
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
            const data = await this.movementService.find(id);
            res.send(data); 
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    @POST()
    public async create(req: Request, res: Response): Promise<void>  {
        try {
            const { user_id, type, amount } = req.body;
            const movementDto: IMovementCreateDto = { user_id, type, amount };
            await this.movementService.create(movementDto);
            res.sendStatus(201);
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
            await this.movementService.delete(id);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
        }

    }
}
