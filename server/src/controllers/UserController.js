import UserModel from '../models/UserModel.js';
import VideoModel from '../models/VideoModel.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

const UserController = {
  updateUser: async (req, res, next) => {
    const { userId } = req.params;
    const { username } = req.body;

    if (userId === req.user.id) {
      try {
        const isUser = await UserModel.findOne({ username: username });
        if (isUser) {
          next(ErrorHandler(400, 'User is already exist. Please try again.'));
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
          { _id: userId },
          { $set: req.body },
          { new: true }
        );

        return res.status(200).json({ user: updatedUser });
      } catch (error) {
        next(ErrorHandler(500, error.message));
      }
    } else {
      next(ErrorHandler(403, 'Invalid token. Please try again'));
    }
  },
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;

    if (userId === req.user.id) {
      try {
        const isUser = await UserModel.findOne({ username: username });
        if (!isUser) {
          next(ErrorHandler(400, 'User does not exist. Please try again.'));
        }

        await UserModel.findByIdAndDelete({ _id: userId }, { new: true });

        return res.status(200).json({ message: 'Deleted successfully.' });
      } catch (error) {
        next(ErrorHandler(500, error.message));
      }
    } else {
      next(ErrorHandler(403, 'Invalid token. Please try again'));
    }
  },
  getUserById: async (req, res, next) => {
    const { userId } = req.params;

    try {
      const isUser = await UserModel.findById({ _id: userId });

      if (!isUser) {
        next(ErrorHandler(400, 'User does not exist. Please try again.'));
      }
      return res.status(200).json(isUser);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  subscribeUser: async (req, res, next) => {
    const { userId } = req.params;
    console.log(req.user.id);
    try {
      await UserModel.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: userId },
      });

      await UserModel.findByIdAndUpdate(userId, { $inc: { subscribers: 1 } });

      return res.status(200).json({ message: 'Subscription successfully.' });
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  unSubscribeUser: async (req, res, next) => {
    const { userId } = req.params;

    try {
      await UserModel.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: userId },
      });

      await UserModel.findByIdAndUpdate(userId, { $inc: { subscribers: -1 } });

      return res.status(200).json({ message: 'UnSubscription successfully.' });
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },

  likeUser: async (req, res, next) => {
    const userId = req.user.id;
    const { videoId } = req.params;

    try {
      await VideoModel.findByIdAndUpdate(videoId, {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      });
      return res.status(200).json({ message: 'Liked video successfully.' });
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  dislikeUser: async (req, res, next) => {
    const userId = req.user.id;
    const { videoId } = req.params;
    console.log(userId);
    try {
      await VideoModel.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId },
      });
      return res.status(200).json({ message: 'Disliked video successfully.' });
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
};

export default UserController;
