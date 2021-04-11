import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

export const Card = ({ texts, setSliderRef, setSlideIndex }) => {
  const slider = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  let settings = {
    dots: true,
    beforeChange: (current, next) => {
      setCurrentSlideIndex(next);
    },
  };

  useEffect(() => {
    setSlideIndex(currentSlideIndex)
  }, [currentSlideIndex])

  useEffect(() => {
    if (slider) {
      setSliderRef(slider.current);
    }
  }, [slider]);

  // Geri qayitmaq zad
  // Slider.current.slickGoTo(1);

  return (
    <>
      <Slider {...settings} ref={slider} touchMove={false} easing={'linear'}>
        {texts &&
          texts.map(({ desc, id }) => (
            <div className='slider-item' key={id}>
              {desc}
            </div>
          ))}
      </Slider>
    </>
  );
};
