import axios from 'axios';

class AuthService {
  static login(body) {
    console.log('body ->', body);
    // axios promise
    return axios.post('/api/login', body);
  }
}

export default AuthService;
