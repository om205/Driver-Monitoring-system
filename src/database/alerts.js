const { runAsync, allAsync, getAsync } = require("./db-utils");
const { v4: uuidv4 } = require("uuid");

async function addAlert(alert) {
  try {
    const alertId = uuidv4();
    alert.id = alertId;
    await runAsync(
      "INSERT INTO alerts (id, alert_type, vehicle_id, timestamp) VALUES (?, ?, ?, ?)",
      [alert.id, alert.alert_type, alert.vehicle_id, alert.timestamp]
    );
    console.log("Alert added to the database:", alert);
  } catch (error) {
    console.error("Error adding alert to the database:", error.message);
  }
}

async function getAllAlerts() {
  try {
    const rows = await allAsync("SELECT * FROM alerts");
    return rows;
  } catch (error) {
    console.error("Error retrieving alerts from the database:", error.message);
    throw error;
  }
}

async function getAlertById(alertId) {
  try {
    const row = await getAsync("SELECT * FROM alerts WHERE id = ?", [alertId]);
    return row;
  } catch (error) {
    console.error("Error retrieving alert from the database:", error.message);
    throw error;
  }
}

module.exports = {
  addAlert,
  getAllAlerts,
  getAlertById,
};
