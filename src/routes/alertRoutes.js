// alertRoutes.js

const express = require("express");
const alertController = require("../controllers/alertController");

const router = express.Router();

// Define routes
router.get("/:alert_id", alertController.getAlertById);
router.get("/", alertController.getAllAlerts);

module.exports = router;
