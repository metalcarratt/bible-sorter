const backgrounds = [
  '/bgs/bg-vine.png',
  '/bgs/bg-shepherd.png',
  '/bgs/bg-lampstand.png',
  '/bgs/bg-river.png',
  '/bgs/bg-altar.png',
  '/bgs/bg-angels-ladder.png',
  '/bgs/bg-jubilee.png',
  '/bgs/bg-noah.png',
  '/bgs/bg-wise-men.png',
  '/bgs/bg-shepherd2.png',
];

export const getRandomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};
