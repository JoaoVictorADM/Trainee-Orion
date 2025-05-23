import './App.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<Login/>} /> {}
          </Routes>
      </div>
    </Router>
  )
}

export default App
