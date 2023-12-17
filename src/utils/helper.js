const database = require("../database/alerts");

async function generateAlert({ alert_type, vehicle_id, timestamp }) {
  const alert = {
    alert_type,
    vehicle_id,
    timestamp,
  };
  await database.addAlert(alert);
}

// Helper function to check if a timestamp is more than 5 minutes ago
function isPast5Minutes(timestamp) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return new Date(timestamp) < fiveMinutesAgo;
}

module.exports = {
  generateAlert,
  isPast5Minutes,
};
