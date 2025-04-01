import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Student from './pages/Student'
import Teacher from './pages/Teacher'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/student' element={<Student/>} />
          <Route path='/teacher' element={<Teacher/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
