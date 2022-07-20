import UserModel from '../models/UserModel.js';
import VideoModel from '../models/VideoModel.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

const VideoController = {
  addVideo: async (req, res, next) => {
    const userId = req.user.id;

    const newVideo = new VideoModel({
      userId: userId,
      ...req.body,
    });

    try {
      const savedVideo = await newVideo.save();

      return res.status(201).json(savedVideo);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  updateVideo: async (req, res, next) => {
    const { videoId } = req.params;

    try {
      const video = await VideoModel.findById(videoId);

      if (!video) {
        return next(ErrorHandler(404, 'Video not found. Please try again.'));
      }

      if (req.user.id === video.userId) {
        const updatedUser = await VideoModel.findByIdAndUpdate(
          videoId,
          { $set: req.body },
          { new: true }
        );
        return res.status(200).json(updatedUser);
      } else {
        return next(
          ErrorHandler(403, 'You can update only your video. Please try again.')
        );
      }
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  deleteVideo: async (req, res, next) => {
    const { videoId } = req.params;

    try {
      const video = await VideoModel.findById(videoId);
      if (!video) {
        return next(ErrorHandler(404, 'Video not found. Please try again.'));
      }
      if (req.user.id === video.userId) {
        await VideoModel.findByIdAndDelete(videoId);
        return res.status(200).json('Deleted video successfully.');
      } else {
        return next(
          ErrorHandler(403, 'You can delete only your video. Please try again.')
        );
      }
    } catch (error) {}
  },
  getVideoById: async (req, res, next) => {
    const { videoId } = req.params;

    try {
      const video = await VideoModel.findById(videoId);

      return res.status(200).json(video);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  updateViewVideo: async (req, res, next) => {
    const { videoId } = req.params;

    try {
      await VideoModel.findByIdAndUpdate(videoId, {
        $inc: { views: 1 },
      });

      return res.status(200).json('The view has been increase');
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  getRandomVideo: async (req, res, next) => {
    try {
      const videos = await VideoModel.aggregate([{ $sample: { size: 40 } }]);

      if (!videos) {
        return next(ErrorHandler(404, 'Video not found. Please try again.'));
      }

      return res.status(200).json(videos);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  getTrendingVideo: async (req, res, next) => {
    try {
      const videos = await VideoModel.find().sort({ views: -1 });

      if (!videos) {
        return next(ErrorHandler(404, 'Video not found. Please try again.'));
      }

      return res.status(200).json(videos);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  getSubscribeVideo: async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;

      const list = await Promise.all(
        subscribedChannels.map((channelId) => {
          return VideoModel.find({ userId: channelId });
        })
      );
      return res
        .status(200)
        .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  getVideoByTag: async (req, res, next) => {
    const tags = req.query.tags.split(',');

    try {
      const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20);
      if (!videos) {
        return next(ErrorHandler(404, 'Video not found. Please try again.'));
      }

      return res.status(200).json(videos);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  searchVideo: async (req, res, next) => {
    const query = req.query.q;

    try {
      const videos = await VideoModel.find({
        title: { $regex: query, $options: 'i' },
      }).limit(40);

      if (!videos) {
        return next(ErrorHandler(404, 'Video not found. Please try again.'));
      }

      return res.status(200).json(videos);
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
};

export default VideoController;
