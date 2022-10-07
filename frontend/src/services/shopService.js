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

  static addProduct(body) {
    return axios.post('/api/product/add', body);
  }

  static getMyProducts(userId) {
    return axios.get(`/api/product/my-adds/${userId}`);
  }

  static getMyProduct(prodId) {
    return axios.get(`/api/product/myAd/${prodId}`);
  }

  // static getOneProduct(prodId) {
  //   return axios.get(`/api/product/myAd/${prodId}`);
  // }

  static saveMyProduct(body, id) {
    return axios.put(`/api/product/save/${id}`, body);
  }

  static deleteMyProduct(myProdId) {
    return axios.delete(`/api/product/delete/${myProdId}`);
  }
}

export default ShopService;
