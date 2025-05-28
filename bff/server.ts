import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './src/routes'
import { errorHandler } from './src/middlewares/error.middleware'
import { setupSwagger } from './src/swagger'

dotenv.config()
const app = express()
setupSwagger(app);

app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`)
})
