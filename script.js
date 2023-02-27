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
  const arrOfUls = [];
  let displayed = false; //On button click menu Is displayed?
  let currentShowedList = 0; //Current showed sublist

  for (node of navigation.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) arrOfUls.push(node);
  }
  resize();

  //Menu button click
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

  //Choose menu entry and show list of sub entryes. Or go back to main list

  function hideList(listNum) {
    if (listNum === 0) return;
    if (menuButton.offsetWidth > 0) {
      arrOfUls[listNum].style.display = "";
      arrOfUls[0].style.display = "";
      currentShowedList = 0;
    } else {
      arrOfUls[listNum].style.display = "";
      arrOfUls[listNum].style.position = "";
      arrOfUls[listNum].style.left = "";
      arrOfUls[listNum].style.top = "";
      arrOfUls[listNum].style.width = "";
      currentShowedList = 0;
    }
  }

  function onMenuChoose(event) {
    event.stopPropagation();
    switch (event.target.textContent) {
      case "Смартфоны":
        {
          arrOfUls[0].style.display = "none";
          arrOfUls[1].style.display = "unset";
          currentShowedList = 1;
        }
        break;
      case "<":
        {
          hideList(currentShowedList);
        }
        break;
    }
  }

  function onMenuEntryHover(event) {
    switch (event.target.textContent) {
      case "Смартфоны": {
        hideList(currentShowedList);
        arrOfUls[1].style.display = "unset";
        arrOfUls[1].style.position = "absolute";
        arrOfUls[1].style.left = "225px";
        arrOfUls[1].style.top = "0";
        arrOfUls[1].style.width = "225px";
        currentShowedList = 1;
      }
    }
  }

  //If window resized go to main list entries and hide menu
  function resize() {
    hideList(currentShowedList);
    arrOfUls[0].style.display = "";
    if (displayed) onMenuClick();
    for (ul of arrOfUls) ul.style.display = "";
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

//Start the scripts

menuStarter();
initHotItemsSlide();
initPromoSlider();
