const Analytics = require("../models/Analytics");

const trackAnalytics = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //find or create todays analytic record
    let analytics = await Analytics.findOne({ date: today });

    if (!analytics) {
      analytics = new Analytics.findOne({ date: today });
    }

    // Increament visitor count
    analytics.visitors += 1;

    // if user is authenticated, increament signedInUsers
    if (req.user) {
      analytics.signedInUsers += 1;
    }

    // if this is an article view increament article view
    if (req.originalUrl.includes("api/articles") && req.method === "GET") {
      analytics.articleViews += 1;
    }

    await analytics.save();
  } catch (err) {
    console.error("Analytics tracking error:", err);
  } finally {
    next();
  }
};

modules.exports = trackAnalytics;
