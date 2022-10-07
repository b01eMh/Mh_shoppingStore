import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShopService from '../../services/shopService';

function AddEditProduct() {
  const [product, setProduct] = useState({
    imgUrl:
      'https://www.groovypost.com/howto/set-default-folder-picture-in-windows-10-file-explorer/',
    userId: JSON.parse(localStorage.getItem('user'))._id,
    rating: Math.floor(Math.random() * 5 + 1),
    title: '',
    category: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();
  const params = useParams();
  const [isFormValid, setIsFormValid] = useState(true);
  const [isApiErr, setIsApiErr] = useState(false);
  const [isProductUpdated, setIsProductUpdated] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(true);

  useEffect(() => {
    if (params.hasOwnProperty('myProdId')) {
      setIsAddProduct(false);
    } else {
      setIsAddProduct(true);
    }
    if (params.hasOwnProperty('myProdId')) {
      const prodId = params.myProdId;
      ShopService.getMyProduct(prodId)
        .then(response => {
          if (response.status === 200) {
            setProduct(response.data);
            setIsApiErr(false);
          }
        })
        .catch(error => {
          console.log(error);
          setIsApiErr(true);
        });
    }
  }, []);

  const addProduct = () => {
    return ShopService.addProduct(product)
      .then(response => {
        if (response.status === 200) {
          console.log('api succes ->');
          setIsProductAdded(true);
          setIsApiErr(false);
          navigate('/my-products');
        }
      })
      .catch(error => {
        console.log(error);
        setIsApiErr(true);
      });
  };

  const editProduct = (body, myProdId) => {
    return ShopService.saveMyProduct(body, myProdId)
      .then(response => {
        if (response.status === 200) {
          setIsProductUpdated(true);
          setIsApiErr(false);
          navigate('/my-products');
        }
      })
      .catch(error => {
        console.log(error);
        setIsApiErr(true);
      });
  };

  const handleInputChange = event => {
    const copyProduct = { ...product };
    copyProduct[event.target.name] = event.target.value;
    setProduct(copyProduct);
  };

  const onSubmitForm = (body, myProdId, event) => {
    event.preventDefault();

    if (!product.description || !product.title || !product.price) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    isAddProduct ? addProduct() : editProduct(body, myProdId);

    // pozivamo shop service i nas api call
    // ShopService.addProduct(product)
    //   .then(response => {
    //     if (response.status === 200) {
    //       console.log('API success ->', response);
    //       setIsApiErr(false);
    //       navigate('/my-products');
    //     }
    //   })
    //   .catch(error => {
    //     setIsApiErr(true);
    //     console.log(error);
    //   });
  };

  return (
    <div className="add-product-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h2 className="text-center mb-5">
              {isAddProduct ? 'Add Product' : 'Edit Product'}
            </h2>
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="formTitle"
                  placeholder="Title"
                  defaultValue={
                    product.hasOwnProperty('title') ? product.title : ''
                  }
                  onChange={event => handleInputChange(event)}
                />
                <label htmlFor="formTitle">Title</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="formSelect"
                  name="category"
                  onChange={event => {
                    const selectedCategory = event.target.value;
                    setProduct(prevState => {
                      return { ...prevState, category: selectedCategory };
                    });
                  }}
                >
                  <option value="php">Php</option>
                  <option value="java_script">Java Script</option>
                  <option value="python">Python</option>
                </select>
                <label htmlFor="formSelect">Category</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  id="formDescription"
                  placeholder="Description"
                  maxLength="240"
                  defaultValue={
                    product.hasOwnProperty('title') ? product.description : ''
                  }
                  onChange={event => handleInputChange(event)}
                />
                <label htmlFor="formDescription">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="formPrice"
                  placeholder="Price"
                  defaultValue={
                    product.hasOwnProperty('title') ? product.price : ''
                  }
                  onChange={event => handleInputChange(event)}
                />
                <label htmlFor="formPrice">Price</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="imgUrl"
                  className="form-control"
                  id="formImage"
                  placeholder="Image URL"
                  onChange={event => handleInputChange(event)}
                />
                <label htmlFor="formImage">Image URL</label>
              </div>
              <button
                className="btn btn-secondary mt-3"
                onClick={event => {
                  onSubmitForm(product, product._id, event);
                }}
              >
                {isAddProduct ? 'Add product' : 'Save'}
              </button>
              {!isFormValid ? <p>All fields are required.</p> : null}
              {isApiErr ? <p>Sorry, we have problem. Try later.</p> : null}
              {isProductUpdated ? <p>Successfully updated.</p> : null}
              {isProductAdded ? <p>Successfully added new product.</p> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditProduct;
