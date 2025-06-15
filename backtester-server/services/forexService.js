const {TWELVE_DATA} = process.env;

const fetchHistoricalForexData= async (symbol, interval = "1h", outputsize = 100) => {
    const url = `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(
    symbol
  )}&interval=${interval}&outputsize=${outputsize}&apikey=${TWELVE_DATA}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.message || "Error fetching forex data.");
  }

  return data.values;
};

module.exports = {
  fetchHistoricalForexData,
};