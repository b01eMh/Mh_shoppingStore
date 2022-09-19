import axios from 'axios';
import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ShopPage from './pages/shop/ShopPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import RegisterForm from './components/register/RegisterForm';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.hasOwnProperty('user')) {
      navigate('/auth');
    }
  }, []);

  return (
    <div className="main-wrapper">
      {/* <header className="App-header">
        <AuthPage />
      </header> */}

      <Link to="/auth">Login</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/about-us">About us</Link>
      <Link to="/contact">Contact</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
