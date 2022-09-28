import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShopCart from '../ShopCart/ShopCart';

function Navigation() {
  // state - redux store from store.js (imamo pristup nasem store.js userStore obj)
  const user = useSelector(state => state.userStore.user);
  useEffect(() => {
    console.log('use eff ...', user);
  }, [user]);

  const userBtnLayout = () => {
    return user.hasOwnProperty('username') ? (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.username}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item">Action</button>
          </li>
          <li>
            <button className="dropdown-item">Another action</button>
          </li>
          <li>
            <button className="dropdown-item">Something else here</button>
          </li>
        </ul>
      </div>
    ) : (
      <li className="nav-item">
        <Link to="/auth" className="nav-link">
          Sign in
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MH onlineShop
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/shop" className="nav-link">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
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
