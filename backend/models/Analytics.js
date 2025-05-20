import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
  date: {
    type: Date, // Fixed from lowercase 'date' to 'Date'
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
    default: 0, // Fixed typo: 'defauly' -> 'default'
  },
});

export default mongoose.model("Analytics", AnalyticsSchema);
