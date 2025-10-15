import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { db } from "../db.js"
export const authRouter = express.Router()
authRouter.post("/register", (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: "email and password required" })
  const passwordHash = bcrypt.hashSync(password, 10)
  const createdAt = new Date().toISOString()
  try {
    const info = db.prepare("INSERT INTO users (email, passwordHash, createdAt) VALUES (?, ?, ?)").run(email, passwordHash, createdAt)
    const user = { id: info.lastInsertRowid, email }
    const token = jwt.sign(user, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" })
    return res.status(201).json({ token, user })
  } catch (e) {
    return res.status(409).json({ message: "User already exists" })
  }
})
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: "email and password required" })
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email)
  if (!row) return res.status(401).json({ message: "Invalid credentials" })
  const ok = bcrypt.compareSync(password, row.passwordHash)
  if (!ok) return res.status(401).json({ message: "Invalid credentials" })
  const user = { id: row.id, email: row.email }
  const token = jwt.sign(user, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" })
  return res.json({ token, user })
})
authRouter.get("/me", (req, res) => {
  const auth = req.headers.authorization || ""
  const [, token] = auth.split(" ")
  if (!token) return res.status(401).json({ message: "Missing token" })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret")
    return res.json({ id: payload.id, email: payload.email })
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
})
