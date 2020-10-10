export const titleInitials = (title) => {
  try {
    return title
      .split(' ')
      .map((word) => word[0])
      .map((char) => char.toUpperCase())
      .slice(0, 2)
      .join('');
  } catch (e) {
    console.warn(e);
    return '🐶';
  }
};

const defaultColours = [
  '#247BA0',
  '#70C1B3',
  '#CBB1DB',
  '#67d8f3',
  '#f3af67',
];

export const getColors = (name) => {
  try {
    const colorInx = Math.round(name.length / defaultColours.length);
    return defaultColours[colorInx];
  } catch (e) {
    console.warn(e);
    return '#67d8f3';
  }
};
