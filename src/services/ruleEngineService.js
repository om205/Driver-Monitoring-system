const database = require("../database");
const CONSTANTS = require("../utils/constants");
const { generateAlert, isPast5Minutes } = require("../utils/helper");

async function evaluateRule() {
  try {
    console.log("$Cron job started");
    const alertThresholds = await database.getAlertThresholds();
    // Get unsafe events from the last 5 minutes
    const unsafeEvents = await database.getRecentUnsafeEvents(
      CONSTANTS.EVENT_INTERVAL
    );
    console.log(`$Last 5 minute Events: `, unsafeEvents);

    unsafeEvents.forEach((event) => {
      const vehicleId = event.vehicle_id;
      console.log(alertThresholds[event.location_type], event.event_count);
      if (alertThresholds[event.location_type] <= event.event_count) {
        const lastAlertTimestamp = getLastAlertTimestamp(vehicleId);

        if (!lastAlertTimestamp || isPast5Minutes(lastAlertTimestamp)) {
          generateAlert({
            alert_type: "Unsafe driving",
            vehicle_id: vehicleId,
            timestamp: new Date().toISOString(),
          })
            .then(() => {
              updateLastAlertTimestamp(vehicleId);
            })
            .catch((error) => {
              console.error("Error generating alert:", error.message);
            });
        }
      }
    });
    console.log("$Cron job ended");
  } catch (error) {
    console.error("Error evaluating rule:", error.message);
  }
}

const lastAlertTimestamps = {};

function getLastAlertTimestamp(vehicleId) {
  return lastAlertTimestamps[vehicleId];
}

function updateLastAlertTimestamp(vehicleId) {
  lastAlertTimestamps[vehicleId] = new Date().toISOString();
}

module.exports = {
  evaluateRule,
};
