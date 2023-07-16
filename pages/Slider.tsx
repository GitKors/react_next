import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Slider.module.css';

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderCount, setSliderCount] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const sliderImages = ["/banner.jpg", "/banner_2.jpg", "/banner_3.jpg"]; 

  const nextSlide = () => {
    setSliderCount((prevCount) => (prevCount + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setSliderCount((prevCount) => (prevCount - 1 + sliderImages.length) % sliderImages.length);
  };

  const rollSlider = () => {
    const sliderLine = sliderRef.current?.querySelector('.slider__line') as HTMLDivElement;
    if (sliderLine) {
      sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
    }
  };

  const thisSlide = (index: number) => {
    const sliderDots = Array.from(sliderRef.current?.querySelectorAll('.slider__dot') || []) as HTMLDivElement[];
    sliderDots.forEach((item) => item.classList.remove(styles['active-dot']));
    sliderDots[index]?.classList.add(styles['active-dot']);
  };

  const handleDotClick = (index: number) => {
    setSliderCount(index);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderLine = slider?.querySelector('.slider__line') as HTMLDivElement;
    const sliderDots = Array.from(slider?.querySelectorAll('.slider__dot') || []) as HTMLDivElement[];

    const showSlide = () => {
      if (slider && sliderLine) {
        setSliderWidth(slider.offsetWidth);
        sliderLine.style.width = `${sliderWidth * sliderImages.length}px`;
        thisSlide(sliderCount);
      }
    };

    const listenDots = () => {
      sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          handleDotClick(index);
        });
      });
    };

    showSlide();
    listenDots();

    const interval = setInterval(nextSlide, 5000);
    setIntervalId(interval);

    return () => {
      sliderDots.forEach((dot, index) => {
        dot.removeEventListener('click', () => {
          handleDotClick(index);
        });
      });

      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    rollSlider();
    thisSlide(sliderCount);
  }, [sliderCount, sliderWidth]);

  return (
    
    <div className={styles['slider__wrapper']} ref={sliderRef}>
      <div className={styles.slider}>
        <div className={styles['slider__line']} style={{ transform: `translateX(${-sliderCount * 100}%)` }}>
          {sliderImages.map((image, index) => (
            <div key={index} className={styles['slider__slide']}>
              <img className={styles['slider__img']} src={image} alt={`Banner ${index + 1}`} />
            </div>
          ))}

        </div>

 
        


        <div className={styles['slider__dots']}>
          {sliderImages.map((_, index) => (
            <div
              key={index}
              className={`${styles['slider__dot']} ${index === sliderCount ? styles['active-dot'] : ''}`}
              onClick={() => {
                handleDotClick(index);
              }}
            />

          ))}

  



        </div>



        <button className={styles['slider__btn-prev']} onClick={prevSlide}>
          <img src="/left.png" alt="Previous" />
        </button>
        <button className={styles['slider__btn-next']} onClick={nextSlide}>
          <img src="/right.png" alt="Next" />
        </button>
      </div>
      <div className={styles['slider__promo-container']}>
        <img className={styles['promo1']} src="/promo 1.jpg" alt="promo_one" />
        <img className={styles['promo2']} src="/promo 2.jpg" alt="promo_two" />
      </div>

    </div>

  );
  
  
};

export default Slider;
