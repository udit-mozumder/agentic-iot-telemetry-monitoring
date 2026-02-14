This project demonstrates an embedded firmware telemetry pipeline integrated with an AI agent for autonomous device health analysis.

An ESP32 publishes system metrics via MQTT.
A Node.js bridge exposes telemetry through a REST API.
A Flowise AI agent dynamically fetches telemetry, applies health rules, and generates structured diagnostic reports.

ESP32 Firmware
     ↓
Mosquitto MQTT Broker
     ↓
Node.js Telemetry Bridge
     ↓
Flowise AI Agent
     ↓
Structured Device Health Report


**Telemetry Fields**

device_id

firmware_version

uptime_seconds

free_heap

rssi

reset_reason

cpu_core

ip


**Agent Capabilities**

Tool invocation (MQTT data fetch)

Rule-based health classification

Detection of weak RSSI

Memory risk detection

Reset instability detection

Structured reporting

Missing telemetry detection

**Firmware Testing Strategy**+------------------+
WiFi disconnect test

MQTT broker failure test

Soak testing (long runtime)

Power reset validation

**Flow chart**



|     ESP32        |
|  Firmware Layer  |
|------------------|
| - WiFi Client    |
| - MQTT Client    |
| - Telemetry JSON |
+--------+---------+
         |
         | MQTT Publish
         v
+------------------+
|  Mosquitto       |
|  MQTT Broker     |
|------------------|
| - Topic Routing  |
| - Pub/Sub Model  |
+--------+---------+
         |
         | MQTT Subscribe
         v
+--------------------------+
|  Node.js Telemetry Bridge|
|--------------------------|
| - MQTT Subscriber        |
| - In-Memory Cache        |
| - REST API (/latest)     |
+------------+-------------+
             |
             | HTTP GET
             v
+---------------------------+
|     Flowise AI Agent      |
|---------------------------|
| - Tool Invocation         |
| - JSON Parsing            |
| - Rule-Based Analysis     |
| - Health Classification   |
+------------+--------------+
             |
             v
+---------------------------+
|  Structured Health Report |
|---------------------------|
| - Status (Healthy/Warning)|
| - Critical Issues         |
| - Recommendations         |
+---------------------------+





