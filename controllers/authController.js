import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: config.SUPABASE_CONNECTION,
});

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rowCount === 0)
    return res.status(400).json({ error: "Kullanıcı bulunamadı" });

  const valid = await bcrypt.compare(password, user.rows[0].passwordhash);

  if (!valid) return res.status(400).json({ error: "Şifre hatalı" });

  const token = jwt.sign(
    { id: user.rows[0].id, email },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};
