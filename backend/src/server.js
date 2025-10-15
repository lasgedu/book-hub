import "dotenv/config"
import express from "express"
import cors from "cors"
import { authRouter } from "./routes/auth.js"
import { booksRouter } from "./routes/books.js"
const app = express()
app.use(cors())
app.use(express.json())
app.get("/api/health", (_req, res) => res.json({ ok: true }))
app.use("/api/auth", authRouter)
app.use("/api/books", booksRouter)
const port = process.env.PORT || 4000
app.listen(port, () => { console.log(`Backend listening on http://localhost:${port}`) })
