import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './src/routes'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  // credentials: true,
}))

app.use(express.json())
app.use('/api', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`)
})
