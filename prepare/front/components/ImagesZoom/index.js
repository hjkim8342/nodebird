import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            //beforeChange의 매개변수가 2개, nexSlide를 써야 제대로 표현 된다.
            beforeChange={(curSlide, nextSlide) => {
              setCurrentSlide(nextSlide);
            }}
            infinite
            speed={500}
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img
                  src={`${v.src.replace(/\/thumb\//, '/original/')}`}
                  alt={v.src}
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;