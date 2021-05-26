// Awilix
import { asClass, createContainer } from 'awilix';

// Class - Controller
// Class - Routes
// Class - Domain
// Class - Services
// Class - Business
// Class - Repository
// Common

// Importar dependencias
import { TestService } from '../services/test.service';

// Create container
const container = createContainer();

// Setup bindings
container.register({
    TestService: asClass(TestService).scoped().singleton()
});

export { container };
