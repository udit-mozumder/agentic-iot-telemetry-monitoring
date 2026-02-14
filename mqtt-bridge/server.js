const express = require("express");
const mqtt = require("mqtt");

const app = express();
app.use(express.json());

let latestMessage = null;

// ✅ Connect to Mosquitto running on Windows
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
  client.subscribe("esp32/system/monitor", (err) => {
    if (!err) {
      console.log("📡 Subscribed to topic: esp32/system/monitor");
    } else {
      console.log("❌ Subscription error:", err);
    }
  });
});

client.on("error", (err) => {
  console.log("❌ MQTT Connection Error:", err);
});

client.on("message", (topic, message) => {
  const msg = message.toString();
  console.log("📩 Received message:", msg);
  latestMessage = msg;
});

// ✅ API endpoint for Flowise
app.get("/latest", (req, res) => {
  res.json({
  status: "success",
  topic: "esp32/system/monitor",
  data: latestMessage ? JSON.parse(latestMessage) : null
});
  });

// Start Express server
app.listen(5000, () => {
  console.log("🚀 MQTT Bridge running on http://localhost:5000");
});
