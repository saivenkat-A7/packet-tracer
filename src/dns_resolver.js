function resolveDNS(hostname, dnsTable) {
  const visited = new Set();
  let current = hostname;

  while (true) {
    if (visited.has(current)) {
      return { success: false, error: "CNAME loop detected" };
    }
    visited.add(current);

    const record = dnsTable[current];
    if (!record) return { success: false, error: "NXDOMAIN" };

    if (record.type === "A") return { success: true, ip: record.value };
    if (record.type === "CNAME") current = record.value;
    else return { success: false, error: "Invalid DNS record type" };
  }
}

module.exports = { resolveDNS };
