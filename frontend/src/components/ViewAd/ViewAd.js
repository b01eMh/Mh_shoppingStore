import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import ShopService from '../../services/shopService';

export default function ViewAd() {
  const [ad, setAd] = useState({});
  const [isParamsAvailable, setIsParamsAvailable] = useState(true);
  const [isApiFinished, setIsApiFinished] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('view_ad ...', params);
    if (params.adId) {
      getAd();
    } else {
      setIsParamsAvailable(false);
    }
  }, []);

  const noParamsMsgLayout = () => {
    return !isParamsAvailable ? <p>No product with this id.</p> : null;
  };

  const getAd = () => {
    ShopService.getAdById(params.adId)
      .then(response => {
        if (response.status === 200) {
          setAd(response.data);
        }
        if (!response.data) {
          setIsParamsAvailable(false);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsApiFinished(true);
      });
  };

  const onToCart = () => {
    dispatch(addToCart(ad));
  };

  const adLayout = () => {
    return (
      <div className="ad-wrapper container d-flex justify-content-center">
        <div className="col-md-6">
          <img className="img-fluid" src={ad.image} alt="Product image" />
        </div>
        <div className="col-md-6">
          <h3>{ad.title}</h3>
          <p>{ad.category}</p>
          <p>{ad.description}</p>
          <p>{ad.price}$</p>
          <button className="btn btn-primary" onClick={onToCart}>
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="view-ad-wrapper">
      <div className="row">
        <div className="col-md-12">
          {noParamsMsgLayout()}
          {ad && ad.hasOwnProperty('id') && isApiFinished && adLayout()}
        </div>
      </div>
    </div>
  );
}
