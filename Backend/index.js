const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "nexus_verium",
  password: process.env.PGPASSWORD || "0000",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432
})

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

app.get("/health", (req, res) => {
  res.json({ status: "up" })
})

app.get("/api/contact", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, company, message FROM contacted ORDER BY id DESC"
    )

    res.json({ submissions: result.rows })
  } catch (error) {
    console.error("Failed to fetch contacts:", error)
    res.status(500).json({ error: "No se pudo obtener los contactos" })
  }
})

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, message } = req.body

  const trimmedName = name?.trim()
  const trimmedEmail = email?.trim()
  const trimmedMessage = message?.trim()

  const missing = []
  if (!trimmedName) missing.push("name")
  if (!trimmedEmail) missing.push("email")
  if (!trimmedMessage) missing.push("message")

  if (missing.length) {
    return res.status(400).json({
      error: "Se requieren más campos",
      missing
    })
  }

  try {
    const normalizedPhone = phone?.trim() || null
    const normalizedCompany = company?.trim() || null

    const insertResult = await pool.query(
      "INSERT INTO contacted (name, email, phone, company, message) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, company, message",
      [trimmedName, trimmedEmail, normalizedPhone, normalizedCompany, trimmedMessage]
    )

    res.status(201).json({ success: true, entry: insertResult.rows[0] })
  } catch (error) {
    console.error("Failed to save contact:", error)
    res.status(500).json({ error: "No se pudo guardar la información" })
  }
})

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Contact backend listening on port ${PORT}`)
})
