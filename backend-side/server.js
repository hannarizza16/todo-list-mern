import express from 'express'
import cors from 'cors' // cors is a middleware that allows you to specify which domains are allowed to access your server
import connectDb from './db/connectDb.js'// connect to the database
import taskRouter from './routes/taskRouter.js'// import routes


connectDb()

const app = express()

// TO DO: create dotenv file and add the port number
const PORT = process.env.PORT

const allowedOrigins = ['https://todolist-fullstack-mern.netlify.app', 'http://localhost:5173'];


// Middlewares
app.use(express.json())
// app.use(cors())  
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

// endpoints
app.use('/api/v1/tasks', taskRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})


