const { findRoute } = require("../src/router");

describe("Router", () => {
  const routingTable = [
    { cidr: "10.0.0.0/8", nextHop: "10.0.0.1", interface: "eth0" },
    { cidr: "192.168.1.0/24", nextHop: "192.168.1.1", interface: "eth1" },
    { cidr: "0.0.0.0/0", nextHop: "172.16.0.1", interface: "eth2" } // default route
  ];

  test("matches exact route", () => {
    const result = findRoute("10.0.5.23", routingTable);
    expect(result.success).toBe(true);
    expect(result.nextHop).toBe("10.0.0.1");
    expect(result.interface).toBe("eth0");
  });

  test("matches more specific route", () => {
    const result = findRoute("192.168.1.50", routingTable);
    expect(result.success).toBe(true);
    expect(result.nextHop).toBe("192.168.1.1");
    expect(result.interface).toBe("eth1");
  });

  test("matches default route if no specific match", () => {
    const result = findRoute("8.8.8.8", routingTable);
    expect(result.success).toBe(true);
    expect(result.nextHop).toBe("172.16.0.1");
  });

  test("returns error if no route matches", () => {
    const emptyTable = [];
    const result = findRoute("10.1.1.1", emptyTable);
    expect(result.success).toBe(false);
    expect(result.error).toBe("No route to host");
  });
});
