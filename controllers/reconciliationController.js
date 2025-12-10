import pkg from "pg";
import { config } from "../config.js";
import { fetchOrders } from "../services/trendyolService.js";
import { calculateNetPayment } from "../utils/calculateNet.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: config.SUPABASE_CONNECTION,
});

export const getReconciliation = async (req, res) => {
  const { storeId } = req.query;

  const store = await pool.query(
    "SELECT * FROM stores WHERE id=$1 AND userId=$2",
    [storeId, req.user.id]
  );

  if (store.rowCount === 0)
    return res.status(400).json({ error: "Store not found" });

  const orders = await fetchOrders(store.rows[0]);

  const results = orders.map(order => ({
    orderNumber: order.orderNumber,
    ...calculateNetPayment(order)
  }));

  res.json(results);
};
