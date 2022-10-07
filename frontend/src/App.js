import axios from 'axios';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { setUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import ShopPage from './pages/Shop/ShopPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Navigation from './components/navigation/Navigation';
import ActivateUserPage from './pages/ActivateUserPage/ActivateUserPage';
import Adpage from './pages/AdPage/Adpage';
import { routeConfig } from './config/routeCofig';
import MyProducts from './pages/MyProducts/MyProducts';
import AddEditProduct from './pages/AddEditProduct/AddEditProduct';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.hasOwnProperty('user')) {
      // navigate('/auth');
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
        <Route path={routeConfig.HOME.url} element={<Home />} />
        <Route path={routeConfig.SHOP.url} element={<ShopPage />} />
        <Route path={routeConfig.AD_SHOP.url} element={<Adpage />} />
        <Route path={routeConfig.ABOUT.url} element={<AboutUs />} />
        <Route path={routeConfig.CONTACT.url} element={<Contact />} />
        <Route path={routeConfig.REGISTER.url} element={<RegisterForm />} />
        <Route path={routeConfig.LOGIN.url} element={<LoginForm />} />
        <Route
          path={routeConfig.USER_ACTIVATE.url}
          element={<ActivateUserPage />}
        />
        <Route path={routeConfig.MY_PRODUCTS.url} element={<MyProducts />} />
        <Route
          path={routeConfig.ADD_PRODUCT.url}
          element={<AddEditProduct />}
        />
        <Route
          path={routeConfig.EDIT_PRODUCT.url}
          element={<AddEditProduct />}
        />
        {/* <Route path={routeConfig.DELETE_PRODUCT.url} element={<DeleteProduct />} /> */}
      </Routes>
    </div>
  );
}

export default App;
