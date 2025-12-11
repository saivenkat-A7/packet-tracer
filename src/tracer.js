const { routePacket } = require('./router');
const { checkFirewall } = require('./firewall'); // ✅ import it here

function tracePacket(packet, config) {
  const trace = [];

  // DNS
  trace.push("Resolving " + packet.destination + "...");
  const dnsRecord = config.dns[packet.destination];
  if (!dnsRecord) {
    trace.push("NXDOMAIN");
    return { status: "FAILED", reason: "NXDOMAIN", trace };
  }
  trace.push(`Resolved ${packet.destination} → ${dnsRecord.value}`);
  packet.destination = dnsRecord.value;

  // Firewall
  trace.push("Checking firewall...");
  const firewallPassed = checkFirewall(packet, config.firewall);
  if (!firewallPassed) {
    trace.push("Blocked by firewall");
    return { status: "FAILED", reason: "BLOCKED_BY_FIREWALL", trace };
  }
  trace.push("Firewall passed");

  // Routing
  trace.push("Routing packet...");
  const result = routePacket(packet, config.routes, trace);
  return result;
}

module.exports = { tracePacket };
