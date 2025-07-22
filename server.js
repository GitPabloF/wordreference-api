const express = require("express")
const cors = require("cors")
const wr = require("wordreference-api")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000

app.get("/translate", async (req, res) => {
  const { word, from = "en", to = "fr" } = req.query
  if (!word) {
    return res.status(400).json({ error: "Missing word parameter" })
  }
  try {
    const result = await wr(word, from, to)
    res.json(result)
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch from wordreference-api",
      details: err.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`WordReference proxy server running on PORT: ${PORT}`)
})
