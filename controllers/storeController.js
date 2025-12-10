import pkg from "pg";
const { Pool } = pkg;
import { config } from "../config.js";

const pool = new Pool({
  connectionString: config.SUPABASE_CONNECTION,
});

export const getStores = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM stores WHERE userid=$1 ORDER BY createdAt DESC",
    [req.user.id]
  );
  res.json(result.rows);
};

export const addStore = async (req, res) => {
  const { storeName, supplierId, apiKey, apiSecret } = req.body;

  await pool.query(
    "INSERT INTO stores (userid, storeName, supplierId, apiKey, apiSecret) VALUES ($1,$2,$3,$4,$5)",
    [req.user.id, storeName, supplierId, apiKey, apiSecret]
  );

  res.json({ success: true });
};

export const updateStore = async (req, res) => {
  const { id } = req.params;
  const { storeName, supplierId, apiKey, apiSecret } = req.body;

  await pool.query(
    "UPDATE stores SET storeName=$1, supplierId=$2, apiKey=$3, apiSecret=$4 WHERE id=$5 AND userid=$6",
    [storeName, supplierId, apiKey, apiSecret, id, req.user.id]
  );

  res.json({ success: true });
};

export const deleteStore = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM stores WHERE id=$1 AND userid=$2", [
    id,
    req.user.id,
  ]);

  res.json({ success: true });
};
