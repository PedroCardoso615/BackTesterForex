const express = require("express");
const { authenticateUser } = require("../middlewares/authMiddleware");
const {
  openTrade,
  getUserTrades,
  getTradeById,
} = require("../services/tradeService");
const tradeController = require("../controllers/tradeController");

const tradeRouter = express.Router();

tradeRouter.use(authenticateUser);

// Create a new trade for the authenticated user
tradeRouter.post("/", authenticateUser, async (req, res) => {
  const {
    pair,
    entryPrice,
    stopLoss,
    takeProfit,
    lotSize,
    direction,
    leverage,
  } = req.body;

  try {
    const trade = await openTrade({
      userId: req.user._id,
      pair,
      entryPrice,
      stopLoss,
      takeProfit,
      lotSize,
      direction,
      leverage,
    });

    res.status(201).json({
      success: true,
      message: "Trade opened successfully",
      trade,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to open trade",
      error: err.message,
    });
  }
});

tradeRouter.post("/close/:tradeId", authenticateUser, tradeController.closeTrade)

// Get all trades for the authenticated user
tradeRouter.get("/", async (req, res) => {
  try {
    const trades = await getUserTrades(req.user._id);
    res.json({ success: true, trades });
  } catch (error) {
    console.error("Fetching trades error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch trades" });
  }
});

// Get a specific trade by ID
tradeRouter.get("/:tradeId", async (req, res) => {
  try {
    const trade = await getTradeById(req.user._id, req.params.tradeId);
    if (!trade) {
      return res.status(404).json({ success: false, error: "Trade not found" });
    }

    res.json({ success: true, trade });
  } catch (error) {
    console.error("Fetching trade error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch trade" });
  }
});

module.exports = tradeRouter;
