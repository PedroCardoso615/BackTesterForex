const express = require("express");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { fetchHistoricalForexData } = require("../services/forexService");

const forexRouter = express.Router();

const allowedIntervals = [
  "1min", "5min", "15min", "30min",
  "1h", "2h", "4h",
  "1day", "1week", "1month"
];

forexRouter.get("/history", authenticateUser, async (req, res) => {
  const { symbol, interval = "1h", outputsize = 100 } = req.query;

  if (!symbol) {
    return res.status(400).json({
      success: false,
      error: "Missing required query parameter: symbol",
    });
  }

  if (!allowedIntervals.includes(interval)) {
    return res.status(400).json({
      success: false,
      error: `Invalid interval '${interval}'. Allowed values are: ${allowedIntervals.join(", ")}`,
    });
  }

  try {
    const data = await fetchHistoricalForexData(symbol, interval, outputsize);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = forexRouter;