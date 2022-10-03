import axios from 'axios';

class ShopService {
  static getAds() {
    return axios.get('https://fakestoreapi.com/products');
  }

  static getAdById(adId) {
    return axios.get(`https://fakestoreapi.com/products/${adId}`);
  }

  static getTopRateProduct(num) {
    return axios.get(`/api/top-products/${num}`);
  }
}

export default ShopService;
