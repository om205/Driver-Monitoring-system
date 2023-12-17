const express = require("express");
const eventRoutes = require("./src/routes/eventRoutes");
const alertRoutes = require("./src/routes/alertRoutes");
const ruleEngineService = require("./src/services/ruleEngineService");
const database = require("./src/database");
const cron = require("node-cron");

const app = express();
app.use(express.json());
const port = 3000;

// Routes
app.use("/event", eventRoutes);
app.use("/alert", alertRoutes);

// Initialize the database
database.initialize(() => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running Rule Evaluation...");
    await ruleEngineService.evaluateRule();
  });
});

// Background task to evaluate the rule every 5 minutes (for production we'll use a cron job)
// setInterval(() => {
//   ruleEngineService.evaluateRule();
// }, 5 * 6 * 1000);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
