export const ColorChar = String.fromCharCode(0x03);
export const BoldChar = String.fromCharCode(0x02);
export const ItalicsChar = String.fromCharCode(0x1D);
export const UnderlineChar = String.fromCharCode(0x1F);
export const PlainChar = String.fromCharCode(0x0F);

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

export const FormatCodes = {
  [BoldChar]: 'bold',
  [ItalicsChar]: 'italics',
  [UnderlineChar]: 'underline'
}

export const ColorCodeRegex = new RegExp(`${ColorChar}(?:(\\d\\d?)(?:,(\\d\\d?))?)?`, 'g');
export const FormatRegex = new RegExp(`[${BoldChar+ItalicsChar+UnderlineChar+PlainChar}]`, 'g')
