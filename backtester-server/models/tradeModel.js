const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pair: {
    type: String,
    required: true,
  },
  entryPrice: {
    type: Number,
    required: true,
  },
  stopLoss: {
    type: Number,
    required: true,
  },
  takeProfit: {
    type: Number,
    required: true,
  },
  lotSize: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  leverage: {
    type: Number,
    enum: [10, 30, 100, 300],
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed", "cancelled"],
    default: "open",
  },
  resultPips: {
    type: Number,
  },
  resultAmount: {
    type: Number,
  },
  marginRequired: {
    type: Number,
    required: true,
  },
  openedAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Trade", TradeSchema);
