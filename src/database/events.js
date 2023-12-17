const { runAsync, allAsync } = require("./db-utils");
const { v4: uuidv4 } = require("uuid");

async function addEvent(event) {
  try {
    const eventId = uuidv4();
    await runAsync(
      "INSERT INTO events (id, timestamp, is_driving_safe, vehicle_id, location_type) VALUES (?, ?, ?, ?, ?)",
      [
        eventId,
        event.timestamp,
        event.is_driving_safe,
        event.vehicle_id,
        event.location_type,
      ]
    );
    // console.log("Event added to the database:", event);
  } catch (error) {
    console.error("Error adding event to the database:", error.message);
  }
}

async function getRecentUnsafeEvents(minutes) {
  try {
    const endTime = new Date();
    const startTime = new Date(endTime - minutes * 60 * 1000);

    // console.log(`fetching events from ${startTime} to ${endTime}`);

    const query = `
        SELECT
        vehicle_id,
        location_type,
        COUNT(*) AS event_count
      FROM
        events
      WHERE
        datetime(timestamp) >= datetime(?) AND datetime(timestamp) <= datetime(?) AND is_driving_safe = 0
      GROUP BY
        vehicle_id, location_type;
    `;

    const rows = await allAsync(query, [
      startTime.toISOString(),
      endTime.toISOString(),
    ]);
    return rows;
  } catch (error) {
    console.error(
      "Error retrieving recent events from the database:",
      error.message
    );
    throw error;
  }
}

module.exports = {
  addEvent,
  getRecentUnsafeEvents,
};
