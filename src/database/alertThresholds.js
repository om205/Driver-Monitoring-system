const { allAsync } = require("./db-utils");

async function getAlertThresholds() {
  try {
    const alertThresholds = await allAsync("SELECT * FROM alert_thresholds");
    const thresholdsMap = {};
    alertThresholds.forEach((row) => {
      thresholdsMap[row.location_type] = row.threshold;
    });
    return thresholdsMap;
  } catch (error) {
    console.error(
      "Error retrieving alert thresholds from the database:",
      error.message
    );
    throw error;
  }
}

module.exports = {
  getAlertThresholds,
};
