import Task from "../models/Task.js";

/////////////////////
// Get all Task List
/////////////////////
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error })
  }
}

/////////////////////
// Add Task
/////////////////////
const createTask = async (req, res) => {
  const { taskTitle } = req.body

  try {
    const newTask = new Task({
      taskTitle
    })

    await newTask.save() // to save in dbase
    res.status(201).json(newTask)

  } catch (error) {
    res.status(500).json({ message: "Error creating task", error })
  }
}

/////////////////////
// Update Task
/////////////////////
const updateTask = async (req, res) => {
  console.log(req.params.id)
  try {
    const taskId = req.params.id
    const { taskTitle } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { taskTitle },
      { new: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task Updated Successfully",
      error: false,
      data: updatedTask // updates in frontend
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error updating task", error })
  }
}

/////////////////////
// delete Task
/////////////////////
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task)
      return res.status(404).json({ message: "Task Not Found" })
    
    await task.deleteOne(); // delete in dbase
    res.status(200).json({ message: "Task Deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message })

  }
}

const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    task.isCompleted = !task.isCompleted //toggle
    
    await task.save();

    res.status(200).json({task})
  } catch (error) {
    res.status(500).json({message: "Error Completing task", error: error.message})
    
  }
}


export { getAllTasks, createTask, updateTask, deleteTask, toggleTask }