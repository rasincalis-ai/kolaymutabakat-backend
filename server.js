import express from "express";
import cors from "cors";
import { config } from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reconciliationRoutes from "./routes/reconciliationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/stores", storeRoutes);
app.use("/orders", orderRoutes);
app.use("/reconciliation", reconciliationRoutes);

app.get("/", (req, res) => {
  res.send("KolayMutabakat Backend Running");
});

app.listen(config.PORT, () =>
  console.log(`Backend running on port ${config.PORT}`)
);
