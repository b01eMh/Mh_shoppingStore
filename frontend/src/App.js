import axios from 'axios';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { setUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ShopPage from './pages/shop/ShopPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Navigation from './components/navigation/Navigation';
import ActivateUserPage from './pages/ActivateUserPage/ActivateUserPage';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.hasOwnProperty('user')) {
      navigate('/auth');
    } else {
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
    }
  }, []);

  return (
    <div className="main-wrapper">
      {/* <header className="App-header">
        <AuthPage />
      </header> */}

      {/* <Link to="/auth">Auth</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/about-us">About us</Link>
      <Link to="/contact">Contact</Link> */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user-activate/:id" element={<ActivateUserPage />} />
      </Routes>
    </div>
  );
}

export default App;
