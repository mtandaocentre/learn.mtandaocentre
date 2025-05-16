const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },

  tags: [String],

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      text: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

ArticleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

modules.exports = mongoose.model("Article", ArticleSchema);
