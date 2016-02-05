function zeroPad(string, length) {
  string = string.toString().substring(0, length);
  let zeroesToAdd = length - string.length;
  for (let i = 0; i < zeroesToAdd; i++) {
    string = '0' + string;
  }
  return string;
}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const replacements = [
  { regex: /dddd/g, replace: date => weekdays[date.getDay()] },
  { regex: /ddd/g, replace: date => weekdays[date.getDay()].substring(0, 3).toUpperCase() },
  { regex: /dd/g, replace: date => zeroPad(date.getDate(), 2) },
  { regex: /d/g, replace: date => date.getDate() },
  { regex: /mmmm/g, replace: date => months[date.getMonth()] },
  { regex: /mmm/g, replace: date => months[date.getMonth()].substring(0, 3).toUpperCase() },
  { regex: /mm/g, replace: date => zeroPad(date.getMonth(), 2) },
  { regex: /m/g, replace: date => date.getMonth() },
  { regex: /yyyy/g, replace: date => date.getFullYear() },
  { regex: /yy/g, replace: date => date.getFullYear().toString().substring(2) },
  { regex: /hh/g, replace: date => zeroPad(date.getHours() > 12 ? date.getHours() - 12 : date.getHours(), 2) },
  { regex: /h/g, replace: date => date.getHours() > 12 ? date.getHours() - 12 : date.getHours() },
  { regex: /HH/g, replace: date => zeroPad(date.getHours(), 2) },
  { regex: /H/g, replace: date => date.getHours() },
  { regex: /MM/g, replace: date => zeroPad(date.getMinutes(), 2) },
  { regex: /M/g, replace: date => date.getMinutes() },
  { regex: /ss/g, replace: date => zeroPad(date.getSeconds(), 2) },
  { regex: /s/g, replace: date => date.getSeconds() },
  { regex: /l/g, replace: date => zeroPad(date.getMilliseconds(), 3) },
  { regex: /L/g, replace: date => zeroPad(date.getMilliseconds(), 2) },
  { regex: /tt/g, replace: date => date.getHours() > 11 ? 'pm' : 'am' },
  { regex: /t/g, replace: date => date.getHours() > 11 ? 'p' : 'a' },
  { regex: /TT/g, replace: date => date.getHours() > 11 ? 'PM' : 'AM' },
  { regex: /t/g, replace: date => date.getHours() > 11 ? 'P' : 'A' }
]


Date.prototype.format = function(format) {
  for (let replacement of replacements) {
    format = format.replace(replacement.regex, replacement.replace(this));
  }
  return format;
}
