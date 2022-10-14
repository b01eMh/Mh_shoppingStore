import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeConfig } from '../../config/routeCofig';
import ShopCart from '../shopCart/ShopCart';

function Navigation() {
  // state - redux store from store.js (imamo pristup nasem store.js userStore obj)
  const user = useSelector(state => state.userStore.user);
  useEffect(() => {
    console.log('use eff ...', user);
  }, [user]);

  const userBtnLayout = () => {
    return user.hasOwnProperty('username') ? (
      <div className="dropdown d-flex align-items-center">
        <li
          className="nav-item dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.username}
        </li>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item">Action</button>
          </li>
          <li>
            <Link to="/my-products" className="dropdown-item">
              My Ads
            </Link>
          </li>
          <li>
            <button className="dropdown-item">Something else here</button>
          </li>
        </ul>
      </div>
    ) : (
      <li className="nav-item">
        <Link to={routeConfig.LOGIN.url} className="nav-link">
          Sign in
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link to={routeConfig.HOME.url} className="navbar-brand">
          MH onlineShop
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={routeConfig.SHOP.url} className="nav-link">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link to={routeConfig.ABOUT.url} className="nav-link">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link to={routeConfig.CONTACT.url} className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <ShopCart />
            </li>
            {userBtnLayout()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
