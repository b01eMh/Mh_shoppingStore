import React, { useEffect, useState } from 'react';
import shopService from '../../services/shopService';
import { routeConfig } from '../../config/routeCofig';
import SlideContent from './SlideContent';
import Arrow from './Arrow';
import Dots from './Dots';
import './style.scss';

function Slider({
  showArrow = true,
  showDots = true,
  slideSpeed = 5000,
  autoPlay = true,
}) {
  const [images, setImages] = useState([]);
  const [currImage, setCurrImage] = useState(0);
  const [numImages, setNumImages] = useState(0);
  const [errResponse, setErrResponse] = useState({ msg: '', haveErr: false });

  useEffect(() => {
    shopService
      .getTopRateProduct(5)
      .then(res => {
        const products = generateData(res.data);
        setNumImages(products.length);
        setImages(products);
      })
      .catch(err => {
        setErrResponse({
          msg: err.message,
          haveErr: true,
        });
      });
  }, []);

  useEffect(() => {
    let interval = null;
    // if have one images dont set interval
    if (autoPlay && images.length > 1) {
      interval = setInterval(() => {
        changeSlide(1);
      }, slideSpeed);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currImage]);

  const generateData = data => {
    return data.map(prod => {
      return {
        title: prod.title,
        subtitle: prod.category,
        src: prod.image,
        btnText: 'Read more',
        btnLink: routeConfig.AD_SHOP.realUrl(prod.id),
      };
    });
  };

  const changeSlide = movement => {
    let imgIndex = currImage + movement;
    if (imgIndex === numImages) {
      imgIndex = 0;
    } else if (imgIndex < 0) {
      imgIndex = numImages - 1;
    }
    setCurrImage(imgIndex);
  };

  return (
    <section className="slider slider-wrapper">
      {images.length > 0 && !errResponse.haveErr ? (
        <SlideContent currentIndex={currImage} image={images[currImage]} />
      ) : (
        <h2 className="slider-error">{errResponse.msg}</h2>
      )}

      {showArrow && images.length > 1 ? (
        <Arrow changeSlide={changeSlide} />
      ) : null}
      {showDots && images.length > 1 ? (
        <Dots
          numberDots={numImages}
          currentDot={currImage}
          setCurrentSlide={setCurrImage}
        />
      ) : null}
    </section>
  );
}

export default Slider;
