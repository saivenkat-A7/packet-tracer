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
git clone https://github.com/saivenkat-A7/packet-tracer.git
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
### **Test /trace API with Thunder Client**
#### **Endpoint**
```
POST http://localhost:3000/trace
Content-Type: application/json
```

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
## No Route to Host Request
```json
{
  "source": "10.0.0.1",
  "destination": "exam.com",
  "protocol": "TCP",
  "port": 80,
  "ttl": 5,
  "scenario": "scenario-basic.json"
}
```



## 1️⃣ No Route to Host Response

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


## Firewall Blocked Request
```json
{
  "source": "10.0.0.1",
  "destination": "blocked.com",
  "protocol": "TCP",
  "port": 80,
  "ttl": 5,
  "scenario": "scenario-basic.json"
}
```

## 2️⃣ Firewall Blocked Response

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
### Success Response

<img width="1900" height="964" alt="Screenshot 2025-12-10 221533" src="https://github.com/user-attachments/assets/d68a8cee-60f0-4a06-9c05-2d18fbfd6abb" />

### Failed NXDOMAIN

<img width="1910" height="966" alt="Screenshot 2025-12-10 221713" src="https://github.com/user-attachments/assets/09ce4072-b1d6-49d1-9363-332ddeff14d6" />

### Failed Blocked_BY_FIREWALL

<img width="1906" height="960" alt="Screenshot 2025-12-10 222315" src="https://github.com/user-attachments/assets/1bc8eed1-d4e5-4438-9af9-73b09177f645" />

### Failed No Route

<img width="1904" height="969" alt="Screenshot 2025-12-10 222335" src="https://github.com/user-attachments/assets/2b94b23b-2794-4654-9bc3-2b9d9df35817" />

### Failed TTL Expired

<img width="1890" height="827" alt="Screenshot 2025-12-10 221017" src="https://github.com/user-attachments/assets/52d04c63-09bc-4a90-b1e2-8a8ceb7210b0" />








