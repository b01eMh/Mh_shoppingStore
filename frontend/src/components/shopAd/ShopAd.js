import { useEffect } from 'react';
import './shopAd.scss';

function ShopAd(props) {
  // props cannot change
  useEffect(() => {
    console.log(props.ad);
  }, []);

  return (
    <div className="shop-ad-wrapper col-md-3">
      {props.ad ? (
        <div>
          <img src={props.ad.image} className="img img-fluid" />
          <p className="shop-ad-title">{props.ad.title}</p>
          <p>Rate: {props.ad.rating.rate}</p>
          <p className="shop-ad-price">{props.ad.price}$</p>
        </div>
      ) : null}
    </div>
  );
}

export default ShopAd;
