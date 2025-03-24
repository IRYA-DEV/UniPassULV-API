// src/infrastructure/container/container.js

import { createContainer, asClass, asValue, asFunction } from 'awilix';

import { scopePerRequest } from 'awilix-express';

// === Repositories ===
import { UserRepository } from '../../adapter/repositories/user.repository.js';
import { AuthRepository } from '../../adapter/repositories/auth.repository.js';

// === UseCases (como objetos estáticos) ===
import * as userUseCases from '../../usercases/user.usercase.js';
import * as authUseCases from '../../usercases/auth.usercase.js';

// === Controllers ===
import makeUserController from '../../adapter/controller/user.controller.js';
import makeAuthController from '../../adapter/controller/auth.controller.js';

// === Crear contenedor ===
const container = createContainer();

// === Registro de dependencias ===
container.register({
  // Repositorios
  userRepository: asClass(UserRepository).scoped(),
  authRepository: asClass(AuthRepository).scoped(),

  // UseCases como valor estático (objeto de funciones)
  userUseCases: asValue(userUseCases),
  authUseCases: asValue(authUseCases),

  // Controladores (factories)
  userController: asFunction(makeUserController).scoped(),
  authController: asFunction(makeAuthController).scoped()
});

export { container, scopePerRequest };
