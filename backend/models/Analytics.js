const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  date: {
    type: date,
    required: true,
    unique: true,
  },

  visitors: {
    type: Number,
    default: 0,
  },

  signedInUsers: {
    type: Number,
    default: 0,
  },

  articleViews: {
    type: Number,
    default: 0,
  },

  shares: {
    type: Number,
    defauly: 0,
  },
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
