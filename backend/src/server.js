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

app.use((err, req, res, next) => {
  console.error("Error:", err)
  res.status(500).json({ message: err.message || "Internal server error" })
})

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
}).on("error", (err) => {
  console.error("Server error:", err)
  process.exit(1)
})
