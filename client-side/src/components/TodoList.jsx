import { useState, useContext } from "react"
import { TodoListContext } from "../../contexts/TodoListContext.jsx"

import { Pencil, Trash2, Check, X, CirclePlus } from 'lucide-react'

export default function TodoList() {
  const { state, addTask, deleteTask, editTask, toggleTaskCompletion, capitalizeFirstLetter } = useContext(TodoListContext)
  const { tasks } = state

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editedTitle, setEditedTitle] = useState("")

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return
    await addTask(newTaskTitle)
    setNewTaskTitle("")
  }

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId)
  }

  const handleEditClick = (task) => {
    setEditingTaskId(task._id) // when edit is clicked 
    setEditedTitle(task.taskTitle) // sets the new title tot taskTitle
  }

  const handleSaveEdit = async (taskId) => {
    if (!editedTitle.trim()) return
    console.log("Saving edited task:", taskId, editedTitle)

    await editTask( taskId, editedTitle )

    setEditingTaskId(null)
    setEditedTitle("")
  }

  const handleCancelEdit = () => {
    setEditingTaskId(null)
    setEditedTitle("")
  }

  const handleToggleComplete = async (task) => {
    await toggleTaskCompletion(task._id, !task.isCompleted)
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="text-3xl font-bold text-center text-gray-900 ">To Do List</span>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 dark:bg-gray-100 dark:border-gray-300">

        {/* Input tasks */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask()
                }
              }}
            placeholder="Enter a new task"
            className="border border-gray-300 rounded-md p-1 mr-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button onClick={handleAddTask} className="text-black hover:text-green-800 cursor-pointer "><CirclePlus size={18}/></button>
        </div>

        {/* Show all tasks */}
        <div>
          {tasks.length === 0 ? (
            <p className="text-red-500 pt-5">No task listed</p>
          ) : (
            /////////////////////////
            // Task descending order
            /////////////////////////
            tasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((task) => (

              <div key={task._id} className="flex justify-between items-center shadow-lg border rounded-md border-gray-300 m-3 p-1 max-w-full">
                {/* Task Editing */}
                {editingTaskId === task._id ? (
                  <>
                    <div className="rounded-md pl-5 text-gray-500 text-md w-full">
                      <textarea
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()  
                            handleSaveEdit(editingTaskId)
                          }
                        }}
                        className="w-full resize-none rounded-md focus:outline-none focus:ring-0"
                        
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => handleSaveEdit(task._id)} className="text-green-500 hover:text-green-700 cursor-pointer"><Check size={15}/></button>
                      <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-700 cursor-pointer"><X size={15}/></button>
                    </div>
                    
                  </>
                ) : (
                  <>
                    <div className="flex items-center max-w-full overflow-hidden ">
                      <input type="checkbox" checked={task.isCompleted} onChange={() => handleToggleComplete(task)} className="mr-2 cursor-pointer"/>
                      <span className={`text-md break-words w-full ${ task.isCompleted ? "line-through text-gray-400" : "" }`}>
                      {capitalizeFirstLetter(task.taskTitle)} {/* task list */}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEditClick(task)} className="text-yellow-500 hover:text-yellow-600 cursor-pointer"><Pencil size={15}/></button>
                      <button type="button" onClick={() => handleDeleteTask(task._id)}className="text-black hover:text-red-600 cursor-pointer" ><Trash2 size={15}/></button>
                    </div>
                    
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
}

