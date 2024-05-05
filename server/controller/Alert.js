const Alert = require("../Models/Alert");

exports.GetRecentAlert = async (req, res) => {
    try {
        const{ProfileId}=req.body;
        // Calculate the timestamp 5 hours ago
        const OneHoursAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);

        // Find alerts created within the last 5 hours
        const recentAlerts = await Alert.find({
            ProfileId,
            timestamp: { $gte: OneHoursAgo }
        });
        
        if (recentAlerts.length === 0) {
            return res.json({
                message: "No recent alerts found.",
                response: []
            });
        }
  
       return res.status(200).json({
            message:"Successfully Fetched Recent Alert",
            response:recentAlerts,
       })
    } catch (error) {
        console.error(error);
      return  res.status(500).json({ message: 'Server Error' });
    }
};


exports.getRecentAlertsByProfileId = async (req, res) => {
    try {
        const { ProfileId } = req.body;

        // Fetch the 10 most recent alerts for the given ProfileId
        const recentAlerts = await Alert.find({ ProfileId }).sort({ timestamp: -1 }).limit(10);
        
        if (recentAlerts.length === 0) {
            return res.json({
                success: "No recent alerts found.",
                response: []
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved the 10 most recent alerts.",
            response: recentAlerts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve recent alerts. Please try again later.' });
    }
};
