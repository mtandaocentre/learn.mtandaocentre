import Analytics from "../models/Analytics.js";

const trackAnalytics = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create today's analytics record
    let analytics = await Analytics.findOne({ date: today });

    if (!analytics) {
      analytics = new Analytics({
        date: today,
        visitors: 0,
        signedInUsers: 0,
        articleViews: 0,
        shares: 0,
      });
    }

    // Increment visitor count
    analytics.visitors += 1;

    // If user is authenticated, increment signedInUsers
    if (req.user) {
      analytics.signedInUsers += 1;
    }

    // If this is an article view, increment articleViews
    if (req.originalUrl.includes("/api/articles/") && req.method === "GET") {
      analytics.articleViews += 1;
    }

    await analytics.save();
  } catch (err) {
    console.error("Analytics tracking error:", err);
  } finally {
    next();
  }
};

export default trackAnalytics;
