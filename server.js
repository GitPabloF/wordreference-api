// wordreference-proxy/server.js
const express = require("express")
const wr = require("wordreference-api")
const app = express()
const PORT = 4000

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
  console.log(`WordReference proxy server running on http://localhost:${PORT}`)
})
