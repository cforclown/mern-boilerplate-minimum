import { Express, Router } from 'express';
import { AuthService } from '../modules';
declare function App(authService: AuthService, mainRouter: Router): Express;
export default App;
