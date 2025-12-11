const { resolveDNS } = require("../src/dns_resolver");

describe("DNS Resolver", () => {
  const dnsTable = {
    "example.com": { type: "A", value: "192.168.1.10" },
    "alias.com": { type: "CNAME", value: "example.com" },
    "loop.com": { type: "CNAME", value: "loop.com" }
  };

  test("resolves A record", () => {
    const result = resolveDNS("example.com", dnsTable);
    expect(result.success).toBe(true);
    expect(result.ip).toBe("192.168.1.10");
  });

  test("resolves CNAME record", () => {
    const result = resolveDNS("alias.com", dnsTable);
    expect(result.success).toBe(true);
    expect(result.ip).toBe("192.168.1.10");
  });

  test("returns NXDOMAIN for unknown domain", () => {
    const result = resolveDNS("unknown.com", dnsTable);
    expect(result.success).toBe(false);
    expect(result.error).toBe("NXDOMAIN");
  });

  test("detects CNAME loop", () => {
    const result = resolveDNS("loop.com", dnsTable);
    expect(result.success).toBe(false);
    expect(result.error).toBe("CNAME loop detected");
  });
});
