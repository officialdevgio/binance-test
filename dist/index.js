import express from "express";
const app = express();
const port = 3000;
import WebSocket from "ws";
// Add binance globals ws fstream
const binanceWs = new WebSocket("wss://fstream.binance.com/ws/btcusdt@kline_1h/btcusdt@trade/btcusdt@depth@100ms");
binanceWs.on("open", () => {
    console.log("WebSocket connection opened");
});
binanceWs.on("message", (message) => {
    const data = JSON.parse(message);
});
binanceWs.on("error", (error) => {
    console.error(error);
});
app.get("/api/klines", async (req, res) => {
    // Get the klines from binance fapi v1
    const { symbol, interval, limit } = req.query;
    const respone = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    const data = await respone.json();
    res.json(data);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
