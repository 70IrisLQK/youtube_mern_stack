import CommentModel from '../models/CommentModel.js';
import VideoModel from '../models/VideoModel.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

const CommentController = {
  addComment: async (req, res, next) => {
    const newComment = new CommentModel({ ...req.body, userId: req.user.id });
    try {
      const savedComment = await newComment.save();
      return res.status(201).json(savedComment);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  deleteComment: async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
      const comment = await CommentModel.findById(commentId);
      const video = await VideoModel.findById(commentId);

      if (userId === comment.userId || userId === video.userId) {
        await CommentModel.commentId;
        return res
          .status(201)
          .json({ message: 'The comment has been deleted.' });
      } else {
        next(ErrorHandler(403, 'Access denied. Please try again.'));
      }
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  getComment: async (req, res, next) => {
    const { videoId } = req.params;

    try {
      const comments = await CommentModel.find({ videoId: videoId });
      return res.status(201).json(comments);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
};

export default CommentController;
