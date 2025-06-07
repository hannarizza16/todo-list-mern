  import { Routes, Route, Navigate } from 'react-router-dom';

  import './App.css'
  import TodoList from './components/TodoList';


  const App = () => {

    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            
            {/* Protected routes */}
            <Route path="/" element={<Navigate to="/todolist" />} />
            <Route path="/todolist" element={<TodoList />}/>
          </Routes>
        </div>
      </>
    )
  }

  export default App

