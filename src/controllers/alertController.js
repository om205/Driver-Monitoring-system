// alertController.js

const database = require("../database");

async function getAlertById(req, res) {
  const alertId = req.params.alert_id;
  try {
    // Retrieve the alert by ID from the database
    const alert = await database.getAlertById(alertId);
    res.json(alert);
  } catch (error) {
    console.error("Error retrieving alert from the database:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllAlerts(req, res) {
  try {
    // Retrieve all alerts from the database
    const alerts = await database.getAllAlerts();
    res.json(alerts);
  } catch (error) {
    console.error("Error retrieving alerts from the database:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllAlerts,
  getAlertById,
};
