const closeTrade = async (req, res) => {
  const userId = req.user.id;
  const { tradeId } = req.params;
  const { currentPrice } = req.body;

  if (!currentPrice) {
    return res.status(400).json({ success: false, error: "Current price is required" });
  }

  try {
    const closedTrade = await tradeService.closeTrade(userId, tradeId, currentPrice);
    res.json({
      success: true,
      message: "Trade closed successfully",
      trade: closedTrade,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  closeTrade,
};