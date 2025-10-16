import "dotenv/config"
import { db, migrate } from "./db.js"
import bcrypt from "bcryptjs"
migrate()
const demoEmail = "heynedu@gmail.com"
const passwordHash = bcrypt.hashSync("000000", 10)
const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(demoEmail)
if (!existing) {
  const createdAt = new Date().toISOString()
  db.prepare("INSERT INTO users (email, passwordHash, createdAt) VALUES (?, ?, ?)").run(demoEmail, passwordHash, createdAt)
}
const count = db.prepare("SELECT COUNT(*) as cnt FROM books").get().cnt
if (count === 0) {
  const now = new Date().toISOString()
  const sample = [
    { 
      title: "Things Fall Apart", 
      author: "Chinua Achebe", 
      genre: "Fiction", 
      description: "Things Fall Apart tells the story of Okonkwo, a leader and wrestling champion in the Nigerian village of Umuofia. The novel chronicles the tragic fall of this proud warrior and the destruction of his community during the arrival of European colonizers and Christian missionaries in the late 19th century.\n\nAchebe's masterwork explores themes of masculinity, tradition versus change, and the devastating cultural impact of colonialism. Through Okonkwo's personal tragedy, the novel illustrates the broader collapse of traditional Igbo society. Written in response to colonial-era novels that portrayed Africans as primitive, Achebe presents African culture with dignity and complexity, establishing this as one of the most important works in African literature.", 
      coverUrl: "/images/books/things-fall-apart.jpg", 
      publishedDate: "1958-06-17", 
      rating: 4.8, 
      createdAt: now 
    },
    { 
      title: "Half of a Yellow Sun", 
      author: "Chimamanda Ngozi Adichie", 
      genre: "Fiction", 
      description: "Set in Nigeria during the 1960s, Half of a Yellow Sun tells the story of the end of the British colonial era and the chaotic years of the Nigerian Civil War (Biafran War). The novel follows the lives of five characters through their intertwining paths during this tumultuous period.\n\nAdichie weaves together the stories of Ugwu, a village boy who becomes a houseboy to a university professor; Olanna, the beautiful daughter of a wealthy family; and Richard, a British writer in love with Olanna's twin sister. Through their experiences, the novel explores love, loyalty, betrayal, and the devastating impact of war on ordinary people. Winner of the Orange Prize for Fiction, this powerful narrative brings to life one of Africa's most tragic conflicts with compassion and unflinching honesty.", 
      coverUrl: "/images/books/half-of-a-yellow-sun.jpg", 
      publishedDate: "2006-09-12", 
      rating: 4.7, 
      createdAt: now 
    },
    { 
      title: "Black Moses", 
      author: "Alain Mabanckou", 
      genre: "Fiction", 
      description: "Black Moses is the story of Moses, a child abandoned at birth in the Congo and raised at a Catholic orphanage by a cruel and eccentric priest. Despite the hardships of his upbringing, Moses develops a unique perspective on life, love, and faith in post-colonial Africa.\n\nMabanckou's novel is both heartbreaking and humorous, exploring themes of abandonment, identity, religion, and colonialism through the eyes of an unforgettable narrator. The story follows Moses from childhood through adolescence, witnessing his struggles, small triumphs, and the colorful cast of characters who populate his world. With wit and compassion, Mabanckou illuminates the complex realities of life in Africa while creating a deeply human portrait of resilience and hope.", 
      coverUrl: "/images/books/black-moses.jpg", 
      publishedDate: "2015-08-13", 
      rating: 4.3, 
      createdAt: now 
    },
    { 
      title: "Call Me Ifegachi", 
      author: "Adesuwa O'man Nwokedi", 
      genre: "Romance", 
      description: "Call Me Ifegachi is a contemporary Nigerian romance that follows the journey of a young woman navigating love, identity, and self-discovery in modern Lagos. Ifegachi must balance family expectations, career ambitions, and her own desires while confronting what it means to be a woman in today's Nigeria.\n\nThis vibrant novel explores themes of cultural identity, independence, and the complexities of modern African romance. Through Ifegachi's story, readers experience the bustling streets of Lagos, the tension between traditional and contemporary values, and the universal search for authentic love and personal fulfillment. With humor, heart, and cultural richness, this novel celebrates Nigerian culture while telling a deeply relatable story of self-acceptance and romantic discovery.", 
      coverUrl: "/images/books/call-me-ifegachi.jpg", 
      publishedDate: "2019-03-15", 
      rating: 4.2, 
      createdAt: now 
    },
    { 
      title: "The Rise of the African Novel", 
      author: "Mukoma Wa Ngugi", 
      genre: "Non-Fiction", 
      description: "The Rise of the African Novel is a groundbreaking critical study examining the development and evolution of African literature from colonialism to the present day. Mukoma Wa Ngugi explores the politics of language, identity, and literary ownership in African writing, challenging conventional narratives about African literature.\n\nThis scholarly work analyzes how African writers have used literature as a tool of resistance, cultural preservation, and self-definition. Ngugi examines key questions: Who owns African stories? What language should African literature use? How do politics and aesthetics intersect in African writing? Drawing on extensive research and literary analysis, this book provides essential context for understanding African literature's place in world literature and its ongoing evolution in the postcolonial era.", 
      coverUrl: "/images/books/rise-of-african-novel.jpg", 
      publishedDate: "2018-10-01", 
      rating: 4.5, 
      createdAt: now 
    },
    { 
      title: "Narrating Africa in Fictions and History", 
      author: "Toyin Falola", 
      genre: "History", 
      description: "In this comprehensive volume, renowned historian Toyin Falola examines how Africa has been narrated through both fictional and historical accounts. The book analyzes the work of Chinua Achebe and other African writers, exploring how literature serves as a form of historical documentation and cultural preservation.\n\nFalola investigates the relationship between fiction and history in African storytelling, demonstrating how novels, oral traditions, and historical accounts work together to create a more complete understanding of African experiences. The book addresses questions of authenticity, representation, and the power dynamics inherent in who gets to tell African stories. This scholarly yet accessible work is essential reading for anyone seeking to understand African history, literature, and the complex interplay between narrative and truth in postcolonial contexts.", 
      coverUrl: "/images/books/narrating-africa.jpg", 
      publishedDate: "2014-05-20", 
      rating: 4.6, 
      createdAt: now 
    },
    { 
      title: "Europe: A History", 
      author: "Norman Davies", 
      genre: "History", 
      description: "Europe: A History is an ambitious and comprehensive survey of European civilization from prehistoric times to the present day. Norman Davies presents a panoramic view of European history, challenging conventional Western-centric narratives by giving equal weight to Eastern European history and lesser-known historical developments.\n\nThis monumental work spans thousands of years, examining the political, cultural, social, and economic forces that shaped the European continent. Davies explores the rise and fall of empires, the development of nations, the impact of wars and revolutions, and the cultural achievements that define European civilization. With meticulous research and engaging prose, this book offers readers a fresh perspective on European history, revealing the continent's rich diversity and the interconnected nature of its many peoples and cultures.", 
      coverUrl: "/images/books/europe-a-history.jpg", 
      publishedDate: "1996-11-14", 
      rating: 4.4, 
      createdAt: now 
    }
  ]
  const insert = db.prepare("INSERT INTO books (title, author, genre, description, coverUrl, publishedDate, rating, createdAt) VALUES (?,?,?,?,?,?,?,?)")
  const tx = db.transaction((rows) => { rows.forEach(r => insert.run(r.title, r.author, r.genre, r.description, r.coverUrl, r.publishedDate, r.rating, r.createdAt)) })
  tx(sample)
}
console.log("Seed completed")