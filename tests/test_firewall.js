const { checkFirewall } = require("../src/firewall");

describe("Firewall", () => {
  const firewallRules = [
    { action: "ALLOW", protocol: "TCP", source: "*", destination: "192.168.1.10" },
    { action: "DENY", protocol: "TCP", source: "10.0.0.5", destination: "*"},
    { action: "DENY", protocol: "UDP", source: "*", destination: "192.168.1.20"}
  ];

  test("allows packet if no deny rule matches", () => {
    const packet = { source: "10.0.0.1", destination: "192.168.1.10", protocol: "TCP" };
    const result = checkFirewall(packet, firewallRules);
    expect(result.blocked).toBe(false);
  });

  test("blocks packet by source", () => {
    const packet = { source: "10.0.0.5", destination: "8.8.8.8", protocol: "TCP" };
    const result = checkFirewall(packet, firewallRules);
    expect(result.blocked).toBe(true);
    expect(result.ruleIndex).toBe(2);
  });

  test("blocks packet by destination and protocol", () => {
    const packet = { source: "10.0.0.1", destination: "192.168.1.20", protocol: "UDP" };
    const result = checkFirewall(packet, firewallRules);
    expect(result.blocked).toBe(true);
    expect(result.ruleIndex).toBe(3);
  });

  test("does not block unrelated packet", () => {
    const packet = { source: "1.2.3.4", destination: "8.8.8.8", protocol: "UDP" };
    const result = checkFirewall(packet, firewallRules);
    expect(result.blocked).toBe(false);
  });
});
