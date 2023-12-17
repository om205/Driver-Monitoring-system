const util = require("util");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("driver_monitoring.db");
const runAsync = util.promisify(db.run.bind(db));
const allAsync = util.promisify(db.all.bind(db));
const getAsync = util.promisify(db.get.bind(db));

function initialize(callback) {
  (async () => {
    await runAsync(`
          CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            timestamp TEXT,
            is_driving_safe BOOLEAN,
            vehicle_id TEXT,
            location_type TEXT,
            UNIQUE(id)
          )
        `);

    await runAsync(`
        CREATE TABLE IF NOT EXISTS alerts (
          id TEXT PRIMARY KEY,
          alert_type TEXT,
          vehicle_id TEXT,
          timestamp TEXT,
          UNIQUE(id)
        )
      `);
    await runAsync(`
          CREATE TABLE IF NOT EXISTS alert_thresholds (
            location_type TEXT PRIMARY KEY,
            threshold INTEGER
          )
        `);

    // Insert or update default threshold values
    await runAsync(
      "INSERT OR REPLACE INTO alert_thresholds (location_type, threshold) VALUES (?, ?)",
      ["highway", 4]
    );
    await runAsync(
      "INSERT OR REPLACE INTO alert_thresholds (location_type, threshold) VALUES (?, ?)",
      ["city_center", 3]
    );
    await runAsync(
      "INSERT OR REPLACE INTO alert_thresholds (location_type, threshold) VALUES (?, ?)",
      ["commercial", 2]
    );
    await runAsync(
      "INSERT OR REPLACE INTO alert_thresholds (location_type, threshold) VALUES (?, ?)",
      ["residential", 1]
    );
  })().then(() => callback());
}

module.exports = {
  runAsync,
  allAsync,
  getAsync,
  initialize,
};
