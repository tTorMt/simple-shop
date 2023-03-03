//Promo slider code

function initPromoSlider() {
  const images = document.querySelectorAll(".promo-image");
  const promo = document.querySelector(".promo");
  const slider = document.querySelector(".promo .slider-line");
  const left = document.querySelector(".promo .left-arrow");
  const right = document.querySelector(".promo .right-arrow");
  let currentImg = 0;

  function resize() {
    let width = promo.offsetWidth;
    slider.style.width = `${width * images.length}px`;
    images.forEach((image, num, arr) => {
      image.style.width = `${width}px`;
      image.style.height = "auto";
    });
    slider.style.transform = `translate(-${
      (slider.offsetWidth / images.length) * currentImg
    }px)`;
  }

  function move(event) {
    if (event.target === left) {
      currentImg =
        currentImg <= 0 ? (currentImg = images.length - 1) : currentImg - 1;
    }
    if (event.target === right) {
      currentImg =
        currentImg >= images.length - 1 ? (currentImg = 0) : currentImg + 1;
    }
    slider.style.transform = `translate(-${
      (slider.offsetWidth / images.length) * currentImg
    }px)`;
  }

  setInterval(move, 5000, { target: right });
  resize();
  window.addEventListener("resize", resize);
  promo.addEventListener("click", move);
}

//Hot items slider

function initHotItemsSlide() {
  const hotItems = document.querySelector(".hot-items");
  const left = document.querySelector(".hot-items .left-arrow");
  const right = document.querySelector(".hot-items .right-arrow");
  const slider = document.querySelector(".hot-items .slider-line");
  const items = document.querySelectorAll(".hot-item");
  let pos = 0;
  const sliderWidth = 180 * items.length;

  function move(event) {
    if (event.target === left) {
      if (pos < -160) pos += 160;
      else pos = 0;
    }
    if (event.target === right) {
      if (sliderWidth + pos - 160 <= hotItems.offsetWidth) {
        pos = -(sliderWidth - hotItems.offsetWidth);
      } else pos -= 160;
    }
    slider.style.transform = `translate(${pos}px)`;
  }

  hotItems.addEventListener("click", move);
  window.addEventListener("resize", () => {
    move({ target: left });
  });
}

//Navigation menu code

function menuStarter() {
  const menuButton = document.querySelector(".user-menu");
  const navigation = document.querySelector("nav");
  const categories = document.querySelector('.categories');
  let displayed = false; //On button click menu Is displayed?
  let currentShowedList = null; //Current showed sublist
  resize();

  //Show and hide menu on button click
  function onMenuClick() {
    if (!displayed) {
      navigation.style.display = "block";
      navigation.style.position = "fixed";
      navigation.style.zIndex = "9999";
      displayed = true;
    } else {
      navigation.style.display = "";
      navigation.style.position = "";
      navigation.style.zIndex = "";
      displayed = false;
    }
  }

  //Sublist show and hide
  function hideList(subList) {
    if (!subList) return;
    if (menuButton.offsetWidth > 0) {
      //If menu button is displayed

      subList.style.display = "";
      categories.style.display = "";
    } else {
      subList.style.display = "";
      subList.style.position = "";
      subList.style.left = "";
      subList.style.top = "";
      subList.style.width = "";
      document.querySelector(`#${subList.id} .back`).style.display = "";
    }
    currentShowedList = null;
  }

  function showList(subList) {
    if (!subList) return;
    if (menuButton.offsetWidth > 0) {
      //if menu button is present
      categories.style.display = "none";
      subList.style.display = "unset";
    } else {
      //if menu button not present
      subList.style.display = "unset";
      subList.style.position = "absolute";
      subList.style.left = "225px";
      subList.style.top = "0";
      subList.style.width = "225px";
      document.querySelector(`#${subList.id} .back`).style.display = "none";
    }
    currentShowedList = subList;
  }

  //Choose menu entry and show list of sub entryes. Or go back to main list
  function onMenuChoose(event) {
    event.stopPropagation();
    if (event.target.getAttribute("class") === "back") {
      hideList(currentShowedList);
      return;
    }
    const subList = document.querySelector(`#${event.target.id}-sub`);
    showList(subList);
  }

  function onMenuEntryHover(event) {
    if (categories.contains(event.target)) {
      const subList = document.querySelector(`#${event.target.id}-sub`);
      hideList(currentShowedList);
      showList(subList);
    }
  }

  //If window resized go to main list entries and hide menu
  function resize() {
    hideList(currentShowedList);
    categories.style.display = "";
    if (displayed) onMenuClick();
    if (menuButton.offsetWidth > 0) {
      navigation.addEventListener("click", onMenuChoose);
      navigation.removeEventListener("mouseover", onMenuEntryHover);
    } else {
      navigation.removeEventListener("click", onMenuChoose);
      navigation.addEventListener("mouseover", onMenuEntryHover);
    }
  }

  window.addEventListener("resize", resize);

  menuButton.addEventListener("click", (event) => {
    onMenuClick();
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (menuButton.offsetWidth > 0) {
      if (displayed) {
        if (!navigation.contains(event.target)) {
          hideList(currentShowedList);
          onMenuClick();
        }
      }
    } else {
      if (!navigation.contains(event.target)) {
        hideList(currentShowedList);
      }
    }
  });
}

//Footer info code

function footerMenuStarter() {
  const uls = document.querySelectorAll('.info ul');
  const spans = document.querySelectorAll('.info span');
  document.querySelector('.info').addEventListener('click', (event) => {
    if (event.target.textContent === '+') {
      for (ul of uls) ul.style.display = '';
      for (span of spans) span.textContent = '+';
      event.target.textContent = '-';
      document.querySelector(`#${event.target.parentNode.id} ul`).style.display = 'unset';
      return;
    }
    if (event.target.textContent === '-') {
      event.target.textContent = '+';
      document.querySelector(`#${event.target.parentNode.id} ul`).style.display = '';
    }
  });
}

//Start the scripts

menuStarter();
footerMenuStarter();
initHotItemsSlide();
initPromoSlider();
