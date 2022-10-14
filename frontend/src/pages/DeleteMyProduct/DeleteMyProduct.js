import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShopService from '../../services/shopService';

function DeleteMyProduct() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const prodId = params.myProdId;
    ShopService.deleteMyProduct(prodId)
      .then(response => navigate('/my-products'))
      .catch(error => console.log(error));
  }, []);

  return <div></div>;
}

export default DeleteMyProduct;
