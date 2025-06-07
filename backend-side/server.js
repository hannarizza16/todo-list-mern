import express from 'express'
import cors from 'cors' // cors is a middleware that allows you to specify which domains are allowed to access your server
import connectDb from './db/connectDb.js'// connect to the database
import taskRouter from './routes/taskRouter.js'// import routes


connectDb()

const app = express()

// TO DO: create dotenv file and add the port number
const PORT = process.env.PORT

// Middlewares
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // allows the front end to send Cookies HTTP Authentication (like basic auth) Client-side SSL certificates
}))  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// endpoints
app.use('/api/v1/tasks', taskRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})


