import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/home';
import Calendar from './pages/Calendar';
import Debates from './pages/Debates';
import DetallesDebates from './pages/DetallesDebates';
import Chats from './pages/Chats';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/debates" element={<Debates />} />
          <Route path="/detalles-debates" element={<DetallesDebates />} />
          <Route path="/chats/:id" element={<Chats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
