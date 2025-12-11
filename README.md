# 📦 Packet Tracer Simulation

A simplified packet-routing simulator built using **Node.js**.  
This project resolves domains, simulates routing between nodes, applies firewall rules, tracks TTL expiry, and returns a detailed trace of how a packet travels across a network.

---

## 🚀 Features

- DNS Resolution  
- Routing Simulation (Hop-by-hop)  
- Firewall Filtering  
- TTL Expiry Handling  
- Detailed Trace Logs  
- JSON-configurable network scenarios  
- REST API endpoint: **POST /trace**

---



## ⚙️ Installation & Setup

### 1. Clone Repo
```
git clone <your-public-repo-url>
cd packet-tracer
```

### 2. Install Dependencies
```
npm install
```

---

## ▶️ Running the Application

### Run Locally
```
npm start
```

App will run on:
```
http://localhost:3000/trace
```

---





# 🌐 API Documentation — `/trace`

### **Method:** POST  
### **URL:** `/trace`  
### **Content-Type:** `application/json`

---

## 📨 Request Example

```json
{
  "source": "10.0.0.1",
  "destination": "example.com",
  "protocol": "TCP",
  "port": 80,
  "ttl": 5,
  "scenario": "scenario-basic.json"
}
```

### Field Description

| Field       | Type   | Required | Description                                 |
|-------------|--------|----------|---------------------------------------------|
| source      | string | Yes      | IP address of sender                        |
| destination | string | Yes      | Domain/IP to reach                          |
|protocol     |string  |Yes       |The transport protocol used by the packet (e.g., TCP, UDP).|
|port         | number |Yes       |The destination port number (e.g., 80 = HTTP, 443 = HTTPS).|
| ttl         | number | No       | Time-to-live. Default: 10                   |
| scenario    | string | Yes      | Scenario file name inside `config/` folder  |

---

# ✅ Success Response Example  
(Using `scenario-basic.json`)

```json
{
  "status": "SUCCESS",
  "trace": [
    "Resolving example.com...",
    "Resolved example.com → 192.168.1.10",
    "Checking firewall...",
    "Firewall passed",
    "Routing packet...",
    "Forwarded to 192.168.1.10 via eth0"
  ]
}
```

---

# ❌ Failure Responses

## 1️⃣ No Route to Host

```json

{
  "status": "FAILED",
  "reason": "NXDOMAIN",
  "trace": [
    "Resolving nxdomain.com...",
    "NXDOMAIN"
  ]
}
```

---

## 2️⃣ Firewall Blocked

```json
{
  "status": "FAILED",
  "reason": "BLOCKED_BY_FIREWALL",
  "trace": [
    "Resolving blocked.com...",
    "Resolved blocked.com → 192.168.1.20",
    "Checking firewall...",
    "Blocked by firewall"
  ]
}
```

---

## 3️⃣ TTL Expired

```json
{
  "status": "FAILED",
  "reason": "TTL expired",
  "trace": [
    "Resolving ttltest.com...",
    "Resolved ttltest.com → 192.168.99.10",
    "Checking firewall...",
    "Firewall passed",
    "Routing packet...",
    "Hop: Router-X",
    "Hop: Router-Y",
    "TTL expired before reaching destination"
  ]
}
```

---

# 📁 Included Scenarios

## `scenario-basic.json`
Demonstrates:
- Simple DNS  
- Simple routing  
- Successful trace  

## `scenario-complex.json`
Includes:
- Multi-hop routing  
- Firewall blocks  
- Missing routes  
- TTL failures  

Shows all major simulator features.

---

#  Screenshot Requirements

