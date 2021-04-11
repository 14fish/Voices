export const slideNext = () => {
  console.log('slide next');
  slider('next');
};
export const slidePrev = () => slider('prev');

const removeFloat = (num) => +num.toFixed(1);

const getTransformAmountFromStyle = (card) => {
  return card.style.transform
    .slice(card.style.transform.indexOf('c') + 4)
    .replace(/[()%]/g, '')
    .split(' ')[0];
};

const removeAddBlurEffect = (cards, transformAmount, i, direction) => {
  const cardClass = cards[i].classList;

  if (
    (transformAmount === -120 && direction === 'next') ||
    (transformAmount === 120 && direction === 'prev')
  ) {
    cardClass.remove('card-animate');
  } else {
    cardClass.add('card-animate');
  }
};

const slideAnimation = (
  card,
  direction,
  currentTransform,
  slideAcceleration
) => {
  let translateAmount = 0;
  let goBackAnimate = true;

  let interval = setInterval(() => {
    if (translateAmount === 120) clearInterval(interval);

    let newVal = '';
    switch (direction) {
      case 'next':
        newVal = `${currentTransform}% + ${translateAmount}%`;
        card.style.transform = `translateX(calc(${newVal})) ${
          translateAmount === 120 ? 'scale(1)' : 'scale(0.8)'
        }`;
        break;
      case 'prev':
        newVal = `calc(${currentTransform}% - ${translateAmount}%)`;
        card.style.transform = `translateX(calc(${newVal})) ${
          translateAmount === 120 ? 'scale(1)' : 'scale(0.8)'
        }`;
        break;
      default:
        break;
    }

    if (goBackAnimate) translateAmount -= 0.1;
    else translateAmount += slideAcceleration;

    slideAcceleration += goBackAnimate ? 0.1 : 0.03;

    // Fix 0.1 + 0.2 = 0.30000000004
    translateAmount = removeFloat(translateAmount);

    if (translateAmount <= -10) goBackAnimate = false;
    if (translateAmount >= 120) translateAmount = 120;
    console.log(translateAmount);
  }, 1);
};

const slider = (direction) => {
  const cards = document.querySelectorAll('.card');
  let slideAcceleration = 0;

  cards.forEach((card, i) => {
    const currentTransform = +getTransformAmountFromStyle(card);
    slideAnimation(card, direction, currentTransform, slideAcceleration);
    setTimeout(
      () => removeAddBlurEffect(cards, currentTransform, i, direction),
      500
    );
  });
};
