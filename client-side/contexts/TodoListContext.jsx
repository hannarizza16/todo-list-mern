import { createContext, useReducer, useEffect } from 'react'
import { initialState, todoListReducer } from '../reducers/todoListReducers.js'
import axios from 'axios'
import { ACTION_TYPES } from '../action_types/actionType.js'

export const TodoListContext = createContext()

export function TodoListProvider({ children }) {

    const [state, dispatch] = useReducer(todoListReducer, initialState)

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            
            dispatch({
                type: ACTION_TYPES.LOAD_TASKS,
                data: response.data
            })
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async(taskTitle) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/create`, { taskTitle })

            dispatch({
                type: ACTION_TYPES.ADD_TASK,
                data: response.data
            })
            
        } catch (error) {
            console.error('Error adding new task', error)
            
        }
    }

    const deleteTask = async(id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`)
            dispatch({
                type: ACTION_TYPES.DELETE_TASK,
                data: {_id: id}
            })

        } catch (error) {
            console.error('Error deleting new task', error)
        }
    }

    const editTask = async(id, taskTitle) => {
        try {
            console.log("Sending PUT request:", { taskTitle });

            const response = await axios.patch(`${API_BASE_URL}/update/${id}`, { taskTitle })

            dispatch({
                type: ACTION_TYPES.EDIT_TASK,
                data: response.data.data
            })
        } catch (error) {
            console.error('Error Updating Task', error)
        }
    }

    const toggleTaskCompletion = async(id, currentStatus) => {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, {isCompleted: !currentStatus})

            dispatch({
                type: ACTION_TYPES.TOGGLE_TASK,
                data: {id}
            })

            
        } catch (error) {
            console.error('Error completing task', error)
            
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1); }

    return (
        <TodoListContext.Provider value={{ 
            state, 
            dispatch, 
            fetchTasks,
            addTask,
            deleteTask,
            editTask,
            toggleTaskCompletion,
            capitalizeFirstLetter
            }}>

            {children}

        </TodoListContext.Provider>
    )
}