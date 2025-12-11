const fs = require("fs");
const path = require("path");

function loadConfig(scenario) {
  const filePath = path.join(__dirname, "..", "config", `${scenario}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

module.exports = { loadConfig };
