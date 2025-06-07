
export const initialState = {
    tasks: []
}

export function todoListReducer(state, action){
    switch(action.type){
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.data]
            }
        case 'LOAD_TASKS':
            return {
                ...state,
                tasks: action.data || []
            }
        case 'EDIT_TASK': 
            return {
                ...state,
                tasks: state.tasks.map(task => 
                    task._id === action.data._id
                ? action.data
                : task )
            }
        case 'DELETE_TASK': 
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.data._id)
            }
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) => 
                    task._id === action.data.id
                        ? {...task, isCompleted:!task.isCompleted} 
                        : task )
            }
        default: 
            return state  
    }
}