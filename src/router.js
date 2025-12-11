const { Netmask } = require('netmask');

function routePacket(packet, routingTable, trace) {
  let ttl = packet.ttl;

  while (ttl > 0) {
    let matchedRoute = null;
    let maxPrefix = -1;

    for (let route of routingTable) {
      const block = new Netmask(route.cidr);
      if (block.contains(packet.destination)) {
        const prefixLength = parseInt(route.cidr.split('/')[1], 10);
        if (prefixLength > maxPrefix) {
          maxPrefix = prefixLength;
          matchedRoute = route;
        }
      }
    }

    if (!matchedRoute) {
      trace.push("No route to host");
      return { status: "FAILED", reason: "No route to host", trace };
    }

    if (packet.destination === matchedRoute.nextHop || new Netmask(matchedRoute.cidr).contains(packet.destination)) {
      trace.push(`Forwarded to ${packet.destination} via ${matchedRoute.interface}`);
      return { status: "SUCCESS", trace };
    }

    ttl--;
    trace.push(`Hop → Next router: ${matchedRoute.nextHop} via ${matchedRoute.interface} (TTL=${ttl})`);
  }

  trace.push("TTL expired before reaching destination.");
  return { status: "FAILED", reason: "TTL_EXPIRED", trace };
}

module.exports = { routePacket }; // ✅ only exports routePacket
