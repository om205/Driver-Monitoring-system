function isValidEvent(event) {
  return (
    event &&
    typeof event.timestamp === "string" &&
    typeof event.is_driving_safe === "boolean" &&
    typeof event.vehicle_id === "string" &&
    typeof event.location_type === "string"
  );
}

module.exports = {
  isValidEvent,
};
