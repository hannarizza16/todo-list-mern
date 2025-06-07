// create a schema for the task model
import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const Task = mongoose.model('Task', taskSchema)

export default Task

