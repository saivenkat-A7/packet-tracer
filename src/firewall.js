function checkFirewall(packet, firewallRules) {
  for (let rule of firewallRules) {
    // Match protocol
    if (rule.protocol && rule.protocol !== packet.protocol) continue;

    // Match source IP (simple match or CIDR)
    if (rule.source && rule.source !== "*" && rule.source !== packet.source) continue;

    // Match destination IP or port
    if (rule.destination && rule.destination !== "*" && rule.destination !== packet.destination) continue;
    if (rule.port && rule.port !== "*" && rule.port !== packet.port) continue;

    // Apply action
    if (rule.action.toUpperCase() === "DENY") {
      return false; // blocked
    }
  }
  return true; // allowed
}

module.exports = { checkFirewall };
