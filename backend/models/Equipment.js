// models/Equipment.js
const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Cardio", "Strength", "Flexibility", "Other"], // Add or modify types as needed
  },
  description: String,
  quantity: {
    type: Number,
    default: 0,
  },
  condition: {
    type: String,
    enum: ["New", "Good", "Fair", "Poor"],
    default: "Good",
  },
  lastMaintenanceDate: Date,
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
