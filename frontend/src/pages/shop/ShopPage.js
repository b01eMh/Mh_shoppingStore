import { useEffect, useState } from 'react';
import ShopAd from '../../components/shopAd/ShopAd';
import ShopService from '../../services/shopService';
import './shopPage.scss';

function ShopPage() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    ShopService.getAds()
      .then(res => {
        if (res.status === 200) {
          setAds(res.data);
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="shop-wrapper container">
      <div className="row">
        {ads.map(element => {
          return <ShopAd ad={element} key={element.id} />;
        })}
      </div>
    </div>
  );
}

export default ShopPage;
