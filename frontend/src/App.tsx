import {BrowserRouter, Routes, Route, type Register} from 'react-router-dom';
import Home from './pages/Home/Home';
import './index.css';
import Signin from "./pages/form/Signin.tsx";
import Register from "./pages/form/Register.tsx";
import Dashboard from "./pages/workflow/Workflow.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
