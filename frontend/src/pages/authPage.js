import { Link } from 'react-router-dom';

function AuthPage() {
  return (
    <div>
      <br />
      <Link to="/login">Sign in</Link>
      <br />
      <br />
      <Link to="/register">Sign up</Link>
    </div>
  );
}
export default AuthPage;
