import React from 'react';
import { Link } from 'react-router-dom';
import { routeConfig } from '../../config/routeCofig';

function MyAd({ product }) {
  return (
    <div className="container">
      {/* <div className="card pt-2 px-2 pb-0">
        <h4 className="card-title">{product.title}</h4>
        <p className="text-muted">Category:{product.category}</p>
        <p className="card-text">{product.description}</p>
        <p>Rating:{product.rating}</p>
        <p>{product.price}$</p>
      </div>
      <div>
        <Link to={`/product/edit/${product._id}`}>Edit</Link>
        <button>Delete</button>
      </div> */}
      <div className="card" style={{ width: 18 + 'rem' }}>
        <img src={product.imgUrl} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
          <p className="card-text">{product.description}</p>
          <p className="card-text">rating:{product.rating}</p>
          <p className="card-text">{product.price}$</p>
          <Link
            to={routeConfig.EDIT_PRODUCT.realUrl(product._id)}
            className="btn btn-info btn-sm"
          >
            Edit
          </Link>
          <Link
            to={routeConfig.DELETE_PRODUCT.realUrl(product._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyAd;
