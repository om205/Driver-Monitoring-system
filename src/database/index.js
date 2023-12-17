const { addEvent, getRecentUnsafeEvents } = require("./events");
const { addAlert, getAllAlerts, getAlertById } = require("./alerts");
const { getAlertThresholds } = require("./alertThresholds");

const { initialize } = require("./db-utils");

module.exports = {
  addEvent,
  getRecentUnsafeEvents,
  addAlert,
  getAllAlerts,
  getAlertById,
  getAlertThresholds,
  initialize,
};
