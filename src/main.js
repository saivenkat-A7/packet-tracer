const express = require("express");
const { tracePacket } = require("./tracer");
const { loadConfig } = require("./config_loader");

const app = express();
app.use(express.json());

// Load default scenario
let currentConfig = loadConfig("scenario-basic");

// Switch scenarios (optional, for demo)
app.post("/load_config/:scenario", (req, res) => {
  const config = loadConfig(req.params.scenario);
  if (!config) {
    return res.status(404).json({ error: "Scenario not found" });
  }
  currentConfig = config;
  res.json({ status: "OK", message: `Scenario switched to ${req.params.scenario}` });
});

// Trace packet endpoint
app.post("/trace", (req, res) => {
  const packet = req.body;
  if (!packet || !packet.source || !packet.destination || !packet.ttl) {
    return res.status(400).json({ error: "Invalid packet format" });
  }

  const trace = tracePacket(packet, currentConfig);
  res.json(trace);
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Packet Tracer Simulator API running. Use POST /trace");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
