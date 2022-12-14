import axios from 'axios';

class AuthService {
  static login(body) {
    console.log('body ->', body);
    // axios promise
    return axios.post('/api/login', body);
  }

  static register(body) {
    return axios.post('/api/register', body);
  }

  static completeRegistration(body) {
    return axios.post('/api/complete-registration', body);
  }
}

export default AuthService;
