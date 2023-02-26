//Promo slider code

function initPromoSlider() {
  const images = document.querySelectorAll(".promo-image");
  const promo = document.querySelector(".promo");
  const slider = document.querySelector(".promo .slider-line");
  const left = document.querySelector('.promo .left-arrow');
  const right = document.querySelector('.promo .right-arrow');
  let currentImg = 0;

  //Listeners
  
  function resize() {
    let width = promo.offsetWidth;
    slider.style.width = `${width * images.length}px`;
    images.forEach((image, num, arr) => {
      image.style.width = `${width}px`;
      image.style.height = "auto";
    });
    slider.style.transform = `translate(-${(slider.offsetWidth / images.length) * currentImg}px)`;
  }

  function move(event) {
    if (event.target === left) {
        currentImg = currentImg <= 0 ? currentImg = images.length - 1 : currentImg - 1;
        
    }
    if (event.target === right) {
        currentImg = currentImg >= (images.length - 1) ? currentImg = 0 : currentImg + 1;
        
    }
      slider.style.transform = `translate(-${(slider.offsetWidth / images.length) * currentImg}px)`;
  }

  setInterval(move, 5000, { target: right });
  resize();
  window.addEventListener("resize", resize);
  promo.addEventListener('click', move);
}

//Hot items slider

function initHotItemsSlide() {
    const hotItems = document.querySelector('.hot-items');
    const left = document.querySelector('.hot-items .left-arrow');
    const right = document.querySelector('.hot-items .right-arrow');
    const slider = document.querySelector('.hot-items .slider-line');
    const items = document.querySelectorAll('.hot-item');
    let pos = 0;
    const sliderWidth = 180 * items.length;
    
    function move(event) {
        if (event.target === left) {
            if (pos < -160) 
                pos += 160;
            else
                pos = 0;
        }
        if (event.target === right) {
            if ((sliderWidth + pos - 160) <= hotItems.offsetWidth) {
                pos = -(sliderWidth - hotItems.offsetWidth);
            } else
                pos -= 160;
        }
        slider.style.transform = `translate(${pos}px)`;
    }
    
    hotItems.addEventListener('click', move);
    window.addEventListener('resize', ()=> {
        move( { target: left } );
    });
}

initHotItemsSlide();
initPromoSlider();
