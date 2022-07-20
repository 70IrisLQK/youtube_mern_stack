import { Router } from 'express';
import VideoController from '../controllers/VideoController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const VideoRoute = Router();

// TODO: Create a video
VideoRoute.post('/videos', verifyToken, VideoController.addVideo);

// TODO: Get trending of video
VideoRoute.get('/videos/trending', VideoController.getTrendingVideo);

// TODO: Get random of video
VideoRoute.get('/videos/random', VideoController.getRandomVideo);

// TODO: Search video
VideoRoute.get('/videos/search', VideoController.searchVideo);

// TODO: Get subscribed of video
VideoRoute.get(
  '/videos/subscription',
  verifyToken,
  VideoController.getSubscribeVideo
);

// TODO: Get tags of video
VideoRoute.get('/videos/tags', VideoController.getVideoByTag);

// TODO: Update a video
VideoRoute.put('/videos/:videoId', verifyToken, VideoController.updateVideo);

// TODO: Delete a video
VideoRoute.delete('/videos/:videoId', verifyToken, VideoController.deleteVideo);

// TODO: Get a video
VideoRoute.get('/videos/:videoId', VideoController.getVideoById);

// TODO: Update view of video
VideoRoute.put(
  '/videos/view/:videoId',
  verifyToken,
  VideoController.updateViewVideo
);

export default VideoRoute;
