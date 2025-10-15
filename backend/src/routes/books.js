import express from "express"
import { db } from "../db.js"
export const booksRouter = express.Router()
booksRouter.get("/", (req, res) => {
  const { query = "", genre = null, author = null, publishedFrom = null, publishedTo = null, sortBy = "createdAt", sortOrder = "desc", page = "1", pageSize = "12" } = req.query
  const filters = []
  const params = []
  if (query) { filters.push("(title LIKE ? OR author LIKE ? OR description LIKE ?)"); params.push(`%${query}%`, `%${query}%`, `%${query}%`) }
  if (genre) { filters.push("genre = ?"); params.push(genre) }
  if (author) { filters.push("author LIKE ?"); params.push(`%${author}%`) }
  if (publishedFrom) { filters.push("date(publishedDate) >= date(?)"); params.push(publishedFrom) }
  if (publishedTo) { filters.push("date(publishedDate) <= date(?)"); params.push(publishedTo) }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  const validSort = ["title","author","publishedDate","rating","createdAt"]
  const sort = validSort.includes(String(sortBy)) ? String(sortBy) : "createdAt"
  const order = String(sortOrder).toLowerCase() === "asc" ? "ASC" : "DESC"
  const pageNum = Math.max(1, parseInt(String(page)))
  const pageSizeNum = Math.min(48, Math.max(1, parseInt(String(pageSize))))
  const offset = (pageNum - 1) * pageSizeNum
  const total = db.prepare(`SELECT COUNT(*) as cnt FROM books ${where}`).get(...params).cnt
  const items = db.prepare(`SELECT * FROM books ${where} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`).all(...params, pageSizeNum, offset)
  return res.json({ items, page: pageNum, pageSize: pageSizeNum, total })
})
booksRouter.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM books WHERE id = ?").get(req.params.id)
  if (!row) return res.status(404).json({ message: "Not found" })
  return res.json(row)
})
booksRouter.post("/", (req, res) => {
  const { title, author, genre, description, coverUrl, publishedDate, rating = 0 } = req.body || {}
  if (!title || !author || !genre || !description || !publishedDate) return res.status(400).json({ message: "Missing fields" })
  const createdAt = new Date().toISOString()
  const info = db.prepare(`INSERT INTO books (title, author, genre, description, coverUrl, publishedDate, rating, createdAt) VALUES (?,?,?,?,?,?,?,?)`).run(title, author, genre, description, coverUrl || null, publishedDate, rating, createdAt)
  const row = db.prepare("SELECT * FROM books WHERE id = ?").get(info.lastInsertRowid)
  return res.status(201).json(row)
})
booksRouter.put("/:id", (req, res) => {
  const { title, author, genre, description, coverUrl, publishedDate, rating } = req.body || {}
  const existing = db.prepare("SELECT * FROM books WHERE id = ?").get(req.params.id)
  if (!existing) return res.status(404).json({ message: "Not found" })
  const updated = { title: title ?? existing.title, author: author ?? existing.author, genre: genre ?? existing.genre, description: description ?? existing.description, coverUrl: coverUrl ?? existing.coverUrl, publishedDate: publishedDate ?? existing.publishedDate, rating: rating ?? existing.rating }
  db.prepare("UPDATE books SET title=?, author=?, genre=?, description=?, coverUrl=?, publishedDate=?, rating=? WHERE id = ?").run(updated.title, updated.author, updated.genre, updated.description, updated.coverUrl, updated.publishedDate, updated.rating, req.params.id)
  const row = db.prepare("SELECT * FROM books WHERE id = ?").get(req.params.id)
  return res.json(row)
})
booksRouter.delete("/:id", (req, res) => {
  const info = db.prepare("DELETE FROM books WHERE id = ?").run(req.params.id)
  if (info.changes === 0) return res.status(404).json({ message: "Not found" })
  return res.status(204).send()
})
