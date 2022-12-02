const switchContainer = document.querySelector('.switch');
const airplanes = switchContainer.querySelectorAll('.airplane');
const switchButton = switchContainer.querySelector('.switch__button');
const cloudLine = document.querySelector('.cloud-line');
const sky = document.querySelector('.sky');
const airport = document.querySelector('.airport');

const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

const getStyleVariable = (property, element = document.documentElement) => {
  return getComputedStyle(element).getPropertyValue(`--${property}`);
};

const animateClouds = (() => {
  const cloudFinalX = -cloudLine.children[0].clientWidth;
  const cloudTimeline = gsap.timeline({ repeat: -1 });
  cloudTimeline.to(cloudLine, 4, { x: cloudFinalX, duration: 2, ease: 'none' });
})();

let isAnimating = false;
const switchButtonFinalX =
  switchContainer.clientWidth - switchButton.clientWidth;
const airplanesFinalX =
  airplanes[0].clientWidth +
  switchButton.clientWidth / 2 -
  airplanes[0].clientWidth / 2;
const airplanesInitialX =
  -1 * (switchButton.clientWidth / 2 - airplanes[0].clientWidth / 2);

const toggleAnimation = isOn => {
  const ease = 'power2.inOut';
  const duration = 0.5;
  const nextState = isOn ? 'off' : 'on';
  const background = getStyleVariable(`color-background-${nextState}`);
  const boxShadow = getStyleVariable(`shadow-${nextState}`);
  const switchButtonX = isOn ? 0 : switchButtonFinalX;
  const airplanesX = isOn ? airplanesInitialX : airplanesFinalX;
  const airportX = isOn ? -110 : -20;
  const opacity = isOn ? 0 : 1;

  gsap.to(document.body, duration, { background, ease });

  gsap.to(switchContainer, duration, { boxShadow, ease });

  gsap.to(switchButton, duration, {
    x: switchButtonX,
    ease
  });

  gsap.to(airplanes, duration, {
    x: airplanesX,
    ease
  });

  gsap.to(airport, duration, {
    x: airportX,
    ease
  });

  gsap.to(sky, duration, {
    opacity,
    ease,
    onComplete() {
      isAnimating = false;
    }
  });
};

const toggleSwitch = ({ currentTarget }) => {
  if (isAnimating) return;
  isAnimating = true;
  const isCurrentlyOn = currentTarget.classList.contains('-on');
  currentTarget.classList.toggle('-on');

  toggleAnimation(isCurrentlyOn);
};

switchContainer.addEventListener('click', toggleSwitch);
