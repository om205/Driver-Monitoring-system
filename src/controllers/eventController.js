const { isValidEvent } = require("../utils/validation");

const database = require("../database");

async function handleEvent(req, res) {
  const event = req.body;
  if (!isValidEvent(event)) {
    return res.status(400).json({ error: "Invalid event format" });
  }

  await database.addEvent(event);

  res.sendStatus(200);
}

module.exports = {
  handleEvent,
};
