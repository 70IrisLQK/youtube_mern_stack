import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const AuthRoute = Router();

// TODO: USER REGISTER
AuthRoute.post('/auth/register', AuthController.register);

// TODO: USER LOGIN
AuthRoute.post('/auth/login', AuthController.login);

// TODO: USER GOOGLE AUTHENTICATE
AuthRoute.post('/auth/google', AuthController.googleAuth);

export default AuthRoute;
