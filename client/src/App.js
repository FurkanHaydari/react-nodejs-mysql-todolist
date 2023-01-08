import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Todo from "./pages/Todo"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/mytodos" element={<Todo />} />
    </Routes>
  )
}

export default App