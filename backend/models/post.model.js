import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: function () {
        return !this.isFree;
      },
      min: 0,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

postSchema.pre('save', function (next) {
  this.isFree = this.price > 0 ? false : true;
  next();
});

const Post = mongoose.model('Post', postSchema);
export default Post;
