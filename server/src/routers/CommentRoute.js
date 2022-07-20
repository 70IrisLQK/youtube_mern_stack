import { Router } from 'express';
import CommentController from '../controllers/CommentController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const CommentRoute = Router();

// TODO: Add comment
CommentRoute.post('/comments', verifyToken, CommentController.addComment);

// TODO: Add comment
CommentRoute.delete(
  '/comments/:commentId',
  verifyToken,
  CommentController.deleteComment
);

// TODO: Get comment
CommentRoute.get('/videos/:videoId/comments', CommentController.getComment);

export default CommentRoute;
