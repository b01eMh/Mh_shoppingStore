import LoginForm from '../components/login/LoginForm';
import { Link } from 'react-router-dom';

function AuthPage() {
  return (
    <div>
      <LoginForm />
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}
export default AuthPage;
