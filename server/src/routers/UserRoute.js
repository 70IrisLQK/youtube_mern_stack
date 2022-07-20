import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const UserRoute = Router();

// TODO: UPDATE USER
UserRoute.put('/users/:userId', verifyToken, UserController.updateUser);

// TODO: DELETE USER
UserRoute.delete('/users/:userId', verifyToken, UserController.deleteUser);

// TODO: GET A USER
UserRoute.get('/users/:userId', UserController.getUserById);

// TODO: SUBSCRIBE A USER
UserRoute.put(
  '/users/subscribe/:userId',
  verifyToken,
  UserController.subscribeUser
);

// TODO: UNSUBSCRIBE A USER
UserRoute.put(
  '/users/unsubscribe/:userId',
  verifyToken,
  UserController.unSubscribeUser
);

// TODO: LIKE A USER
UserRoute.put('/users/like/:videoId', verifyToken, UserController.likeUser);

// TODO: DISLIKE A USER
UserRoute.put(
  '/users/dislike/:videoId',
  verifyToken,
  UserController.dislikeUser
);

export default UserRoute;
