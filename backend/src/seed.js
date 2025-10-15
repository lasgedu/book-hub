import "dotenv/config"
import { db, migrate } from "./db.js"
import bcrypt from "bcryptjs"
migrate()
const demoEmail = "demo@bookhub.local"
const passwordHash = bcrypt.hashSync("password123", 10)
const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(demoEmail)
if (!existing) {
  const createdAt = new Date().toISOString()
  db.prepare("INSERT INTO users (email, passwordHash, createdAt) VALUES (?, ?, ?)").run(demoEmail, passwordHash, createdAt)
}
const count = db.prepare("SELECT COUNT(*) as cnt FROM books").get().cnt
if (count === 0) {
  const now = new Date().toISOString()
  const sample = [
    { title: "The Silent Library", author: "A. Reader", genre: "Fiction", description: "A quiet tale set among stacks of forgotten stories.", coverUrl: null, publishedDate: "2018-05-01", rating: 4.2, createdAt: now },
    { title: "Understanding Space-Time", author: "Dr. Nova", genre: "Science", description: "An approachable guide to the fabric of the universe.", coverUrl: null, publishedDate: "2020-09-10", rating: 4.6, createdAt: now },
    { title: "Chronicles of the Azure Realm", author: "L. Storm", genre: "Fantasy", description: "Heroes rise to restore balance in a land of magic.", coverUrl: null, publishedDate: "2016-11-15", rating: 4.0, createdAt: now },
    { title: "Hearts in Transit", author: "J. Vale", genre: "Romance", description: "Two strangers find connection on a cross-country journey.", coverUrl: null, publishedDate: "2022-02-14", rating: 3.9, createdAt: now },
    { title: "Echoes of Empire", author: "M. Rowan", genre: "History", description: "A sweeping look at the rise and fall of empires.", coverUrl: null, publishedDate: "2012-03-22", rating: 4.5, createdAt: now },
    { title: "The Art of Code", author: "S. Developer", genre: "Non-Fiction", description: "A comprehensive guide to programming fundamentals.", coverUrl: null, publishedDate: "2021-07-15", rating: 4.3, createdAt: now },
    { title: "Digital Dreams", author: "M. Technologist", genre: "Science", description: "Exploring the future of artificial intelligence.", coverUrl: null, publishedDate: "2023-01-20", rating: 4.1, createdAt: now },
    { title: "Mystery of the Lost City", author: "A. Explorer", genre: "Fiction", description: "An archaeological thriller set in the Amazon rainforest.", coverUrl: null, publishedDate: "2019-11-08", rating: 4.4, createdAt: now }
  ]
  const insert = db.prepare("INSERT INTO books (title, author, genre, description, coverUrl, publishedDate, rating, createdAt) VALUES (?,?,?,?,?,?,?,?)")
  const tx = db.transaction((rows) => { rows.forEach(r => insert.run(r.title, r.author, r.genre, r.description, r.coverUrl, r.publishedDate, r.rating, r.createdAt)) })
  tx(sample)
}
console.log("Seed completed")
