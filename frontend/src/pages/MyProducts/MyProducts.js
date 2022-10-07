import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShopService from '../../services/shopService';
import MyAd from '../../components/myAd/MyAd';

function MyProducts() {
  const [products, setProducts] = useState([]);

  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    getMyAds();
  }, []);

  const getMyAds = () => {
    ShopService.getMyProducts(userId)
      .then(response => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-3">
      <h1>My products</h1>
      <div className="d-flex justify-content-between m-auto container mt-3 mb-3">
        <Link className="btn btn-secondary" to="/add-product">
          Add product
        </Link>
        <div>
          <span>Sort by:</span>
          <select>
            <option value="date">Date</option>
            <option value="lowPrice">Low Price</option>
            <option value="highPrice">High Price</option>
          </select>
        </div>
      </div>
      <div className="row">
        {products.map((product, index) => {
          return <MyAd product={product} key={index} />;
        })}
      </div>
    </div>
  );
}

export default MyProducts;
