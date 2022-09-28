import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShopAd(props) {
  // props cannot change
  useEffect(() => {
    console.log(props.ad);
  }, []);

  return (
    <div className="shop-ad-wrapper d-flex col-md-3">
      {props.ad ? (
        <div className="card" style={{ width: 18 + 'rem' }}>
          <img
            src={props.ad.image}
            className="card-img-top"
            alt="Product image"
          />
          <div className="card-body">
            <h5 className="card-title">{props.ad.title}</h5>
            <p className="card-text">Rate: {props.ad.rating.rate}</p>
            <p className="card-text">{props.ad.price}$</p>
            <Link to={`/shop/ad/${props.ad.id}`}>
              <p className="view-more-btn">View Product</p>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ShopAd;
