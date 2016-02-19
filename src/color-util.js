export const ColorChar = String.fromCharCode(3);

export const ColorCodes = [
  'white',
  'black',
  'blue',
  'green',
  'red',
  'brown',
  'purple',
  'orange',
  'yellow',
  'light-green',
  'teal',
  'cyan',
  'light-blue',
  'pink',
  'grey',
  'light-grey'
];

export const ColorCodeRegex = new RegExp(`${ColorChar}(?:(\\d\\d?)(?:,(\\d\\d?))?)?`, 'g');
