// Awilix
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// Express
import { Application } from 'express';

// Class - Services
import { SubscriptionService, BalanceService, MovementService  } from '../services';

// Class - Repository
import { SubscriptionRepository, BalanceRepository, MovementRepository } from '../dal/walletRepository/repositories'
import { SubscriptionMapperDB, BalanceMapperDB, MovementMapperDB } from '../dal/walletRepository/mapper'


// Create container
const container = createContainer({ injectionMode: 'CLASSIC' });

// Bindings Services
container.register({
    subscriptionService: asClass(SubscriptionService).scoped().singleton(),
    balanceService: asClass(BalanceService).scoped().singleton(),
    movementService: asClass(MovementService).scoped().singleton(),
});

// Bindings Repositories
container.register({
    subscriptionRepository: asClass(SubscriptionRepository).scoped().singleton(),
    balanceRepository: asClass(BalanceRepository).scoped().singleton(),
    movementRepository: asClass(MovementRepository).scoped().singleton()
});

// Bindings Mapper Repositories
container.register({
    subscriptionMapperDB: asClass(SubscriptionMapperDB).scoped().singleton(),
    balanceMapperDB: asClass(BalanceMapperDB).scoped().singleton(),
    movementMapperDB: asClass(MovementMapperDB).scoped().singleton()
});

// Inicilizador del contenedor
const loadContainer = (app: Application): void => { app.use(scopePerRequest(container)); };

export default loadContainer;
