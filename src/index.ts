import express from "express";
import type { Request, Response } from "express";
import ws from "ws";
import io from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import WebSocket, { WebSocket as WSClient } from "ws";

// Add binance globals ws fstream
const binanceWs = new WebSocket(
  "wss://fstream.binance.com/ws/btcusdt@kline_1h/btcusdt@trade/btcusdt@depth@100ms"
);
binanceWs.on("open", () => {
  console.log("WebSocket connection opened");
});
binanceWs.on("message", (message: string) => {
  const data = JSON.parse(message);
});
binanceWs.on("error", (error: Error) => {
  console.error(error);
});
app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "Hello World" });
  console.log("Hello World");
});
app.get("/api/klines", async (req: Request, res: Response): Promise<void> => {
  // Get the klines from binance fapi v1
  const { symbol, interval, limit } = req.query;
  const respone = await fetch(
    `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );
  const data = await respone.json();
  console.log(data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
