const TradeModel = require('../models/tradeModel');
const UserModel = require('../models/userModel');

const ALLOWED_LEVERAGE = [10, 30, 100, 300];

// Open Trade
const openTrade = async ({
  userId,
  pair,
  entryPrice,
  stopLoss,
  takeProfit,
  lotSize,
  direction,
  leverage,
}) => {
  if (!["buy", "sell"].includes(direction)) {
    throw new Error("Invalid direction");
  }

  if (!ALLOWED_LEVERAGE.includes(leverage)) {
    throw new Error(`Leverage must be one of: ${ALLOWED_LEVERAGE.join(", ")}`);
  }

  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const marginRequired = (lotSize * 100000) / leverage;

  if (user.balance < marginRequired) {
    throw new Error("Insufficient balance to place this trade.");
  }

  user.balance -= marginRequired;
  await user.save();

  const newTrade = await TradeModel.create({
    userId,
    pair,
    entryPrice,
    stopLoss,
    takeProfit,
    lotSize,
    direction,
    marginRequired,
    leverage,
  });

  return newTrade;
};

// Close Trade
const closeTrade = async (userId, tradeId, currentPrice) => {
  const trade = await TradeModel.findOne({ _id: tradeId, userId });

  if (!trade) throw new Error("Trade not found");
  if (trade.status !== "open") throw new Error("Trade already closed");

  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const isJPY = trade.pair.includes("JPY");
  const pipFactor = isJPY ? 100 : 10000;

  let pips;
  if (trade.direction === "buy") {
    pips = (currentPrice - trade.entryPrice) * pipFactor;
  } else {
    pips = (trade.entryPrice - currentPrice) * pipFactor;
  }

  const pipValue = trade.lotSize * 10;
  const resultAmount = pips * pipValue;

  user.balance += trade.marginRequired + resultAmount;
  await user.save();

  trade.status = "closed";
  trade.resultPips = parseFloat(pips.toFixed(1));
  trade.resultAmount = parseFloat(resultAmount.toFixed(2));
  trade.closedAt = new Date();
  await trade.save();

  return trade;
};

const getUserTrades = async (userId) => {
  return await TradeModel.find({ userId }).sort({ createdAt: -1 });
};

const getTradeById = async (userId, tradeId) => {
  return await TradeModel.findOne({ _id: tradeId, userId });
};

module.exports = {
  openTrade,
  getUserTrades,
  getTradeById,
};