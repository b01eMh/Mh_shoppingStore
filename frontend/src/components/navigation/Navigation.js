import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navigation() {
  // state - redux store from store.js (imamo pristup nasem store.js userStore obj)
  const user = useSelector(state => state.userStore.user);
  useEffect(() => {
    console.log('use eff ...', user);
  }, [user]);

  const userBtnLayout = () => {
    return user.hasOwnProperty('username') ? (
      user.username
    ) : (
      <li className="nav-item">
        <Link to="/auth" className="nav-link">
          Login or Register
        </Link>
      </li>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            MH Shop
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
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
              {userBtnLayout()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
