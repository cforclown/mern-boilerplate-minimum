import { asClass, asFunction, createContainer, InjectionMode } from 'awilix';
import {
  AuthController,
  AuthRouter,
  AuthService,
  UsersController,
  UsersDao,
  UsersRouter,
  UsersService
} from './resources';

export const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

export function setup (): void {
  container.register({
    authRouter: asFunction(AuthRouter),
    authController: asClass(AuthController),
    authService: asClass(AuthService),
    usersRouter: asFunction(UsersRouter),
    usersController: asClass(UsersController),
    usersService: asClass(UsersService),
    usersDao: asClass(UsersDao)
  });
}
