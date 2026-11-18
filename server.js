
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Check whether the server is running
app.get("/", (req, res) => {
  res.json({
    message: "DRUX TICKETS server is running!"
  });
});

// Check available event
app.get("/api/event", (req, res) => {
  res.json({
    name: "Carnival Panorama Party",
    venue: "Kitale West Side Hotel",
    date: "13 December 2026",
    time: "10:00 AM till late",
    price: 300,
    currency: "KES"
  });
});

// Demonstration booking calculation
app.post("/api/bookings", (req, res) => {
  const { name, phone, quantity } = req.body;

  if (!name || !phone || !quantity) {
    return res.status(400).json({
      error: "Please provide name, phone and quantity."
    });
  }

  const count = Number(quantity);

  if (!Number.isInteger(count) || count < 1 || count > 10) {
    return res.status(400).json({
      error: "Quantity must be between 1 and 10."
    });
  }

  res.json({
    message: "Booking preview created. No payment received.",
    event: "Carnival Panorama Party",
    quantity: count,
    total: count * 300,
    currency: "KES",
    confirmed: false
  });
});

app.listen(PORT, () => {
  console.log("DRUX TICKETS server running on port " + PORT);
});

