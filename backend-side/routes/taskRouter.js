
import express from 'express'
import { getAllTasks,createTask, updateTask, deleteTask, toggleTask } from '../controllers/taskController.js'

const router = express.Router()

// Protected Routes
router.get('/all', getAllTasks)
router.post('/create', createTask)
router.patch('/update/:id', updateTask)
router.delete('/:id', deleteTask)
router.put('/:id', toggleTask)

export default router