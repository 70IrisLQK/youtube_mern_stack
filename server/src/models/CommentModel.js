import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
