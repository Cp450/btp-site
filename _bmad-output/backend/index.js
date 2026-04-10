const express = require('express')
const cors = require('cors')
require('dotenv').config()

const devisRouter = require('./routes/devis')

const app = express()

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://fogatech.com', 'https://www.fogatech.com']
  : true

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/devis_requests', devisRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Fogatech BTP backend running on port ${PORT}`)
})
