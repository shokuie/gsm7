
function decode(buff) {
  let idx = 0;
  let bitCap = 0;
  let shiftBits = 0;
  let curChar = null;
  let text = '';
  let character = '';
  let extendedChar = false;

  while (idx < buff.length) {
    const pos = (idx % 7);

    if (!pos && shiftBits) {
      if ((shiftBits & 0x7f) === 27) {
        extendedChar = true;
      } else {
        character = extendedChar ? extendedGsm7Charset[shiftBits & 0x7f] : gsm7Charset[shiftBits & 0x7f];
        text += character;
        extendedChar = false;
      }
      shiftBits >>= 7;
    }

    bitCap = Math.pow(2, 7 - pos) - 1;
    curChar = (buff[idx] & bitCap) << pos;
    curChar |= shiftBits;
    shiftBits = buff[idx] >> (7 - pos);

    if (curChar === 27) {
      extendedChar = true;
    } else {
      character = extendedChar ? extendedGsm7Charset[curChar] : gsm7Charset[curChar];
      text += character;
      extendedChar = false;
    }

    idx++;
  }

  if (shiftBits && shiftBits !== 13 /* CR */) {
    text += gsm7Charset[shiftBits];
  }

  return text;
}

function getCharCode(value) {
  let retVal = Object.keys(gsm7Charset).find(key => gsm7Charset[key] === value);

  if (!retVal) {
    retVal = Object.keys(extendedGsm7Charset).find(key => extendedGsm7Charset[key] === value);
    retVal = (retVal << 8) | 27;
  }

  return retVal;
}

function encode(content) {
  let idx = 0;
  let inputIdx = 0;
  let bitCap = 0;
  let asciiCode = 0;
  let prevAsciiCode = 0;
  let overflowChar = 0;
  let retBuff = Buffer.from([]);

  while (inputIdx < content.length) {
    const pos = (idx % 8);

    if (!overflowChar) {
      asciiCode = getCharCode(content[inputIdx++]);
    } else {
      asciiCode = overflowChar;
      overflowChar = 0;
    }

    if (asciiCode > 0x7f) {
      overflowChar = asciiCode >> 8;
      asciiCode &= 0xff;
    }

    if (!pos) {
      prevAsciiCode = asciiCode;
    } else {
      bitCap = Math.pow(2, pos) - 1;
      prevAsciiCode |= ((asciiCode & bitCap) << (8 - pos));
      asciiCode >>= pos;

      retBuff = Buffer.concat([retBuff, Buffer.from([prevAsciiCode])], retBuff.length + 1);
      prevAsciiCode = asciiCode;
    }

    idx++;
  }

  if (prevAsciiCode) {
    retBuff = Buffer.concat([retBuff, Buffer.from([prevAsciiCode])], retBuff.length + 1);
  }

  return retBuff;
}


/**
* GSM 7 bit default alphabet lookup table
*/
const gsm7Charset = {
  0: '@', 1: '£', 2: '$', 3: '¥', 4: 'è', 5: 'é', 6: 'ù', 7: 'ì', 8: 'ò', 9: 'Ç',
  10:'\n', 11: 'Ø', 12: 'ø', 13: '\r', 14: 'Å', 15: 'å', 16: '\u0394', 17: '_', 18: '\u03a6', 19: '\u0393',
  20: '\u039b', 21: '\u03a9', 22: '\u03a0', 23: '\u03a8', 24: '\u03a3', 25: '\u0398', 26: '\u039e', 28: 'Æ', 29: 'æ',
  30: 'ß', 31: 'É', 32: ' ', 33: '!', 34: '"', 35: '#', 36: '¤', 37: '%', 38: '&', 39: '\'',
  40: '(', 41: ')', 42: '*', 43: '+', 44: ',', 45: '-', 46: '.', 47: '/', 48: '0', 49: '1',
  50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 58: ':', 59: ';',
  60: '<', 61: '=', 62: '>', 63: '?', 64: '¡', 65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E',
  70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O',
  80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y',
  90: 'Z', 91: 'Ä', 92: 'Ö', 93: 'Ñ', 94: 'Ü', 95: '§', 96: '¿', 97: 'a', 98: 'b', 99: 'c',
  100: 'd', 101: 'e', 102: 'f', 103: 'g', 104: 'h', 105: 'i', 106: 'j', 107: 'k', 108: 'l', 109: 'm',
  110: 'n', 111: 'o', 112: 'p', 113: 'q', 114: 'r', 115: 's', 116: 't', 117: 'u', 118: 'v', 119: 'w',
  120: 'x', 121: 'y', 122: 'z', 123: 'ä', 124: 'ö', 125: 'ñ', 126: 'ü', 127: 'à'
};

const extendedGsm7Charset = {
  10: '\n', // Should be FORM-FEED but no good here
  20: '^', 40: '{', 41: '}', 47: '\\',
  60: '[', 61: '~', 62: ']', 64: '|', 101: '&#8364;'
};

module.exports = Object.freeze({
  decode,
  encode
});
