const gsm7 = require('../index.js');
const expect = require('chai').use(require('chai-bytes')).expect;

describe('decode', () => {
  it('Should decode GSM7 buffer to ASCII text', () => {
    const asciiText = gsm7.decode(Buffer.from('54747A0EDAF4D2735018B4A1D0CB733AC8FC96838ED3E60DB44191CBE337B92CDFA41A', 'hex'));

    expect(asciiText).to.eql('This ~is a ^test for GSM7 {decoder}');
  });
});

describe('decode', () => {
  it('Should decode short GSM7 buffer to ASCII text', () => {
    const asciiText = gsm7.decode(Buffer.from('D4F29C1E9BD11A', 'hex'));

    expect(asciiText).to.eql('Test134');
  });
});

describe('decode', () => {
  it('Should decode GSM7 buffer ending with 00 to ASCII text', () => {
    const asciiText = gsm7.decode(Buffer.from('C8744C36A3D500', 'hex'));

    expect(asciiText).to.eql('Hi12345@');
  });
});

describe('decode', () => {
  it('Should decode a sample GSM7 buffer to ASCII text', () => {
    const asciiText = gsm7.decode(Buffer.from('E9F61B347E93CB3AD04D16A301', 'hex'));

    expect(asciiText).to.eql('imo code: 7214');
  });
});

describe('decode', () => {
  it('Should decode GSM7 buffer ending in 01', () => {
    const asciiText = gsm7.decode(Buffer.from('d4f29c9e769f01', 'hex'));

    expect(asciiText).to.eql('Testing@');
  });
});

describe('decode', () => {
  it('Should decode GSM7 buffer 00 to ASCII `@`', () => {
    const asciiText = gsm7.decode(Buffer.from('00', 'hex'));

    expect(asciiText).to.eql('@');
  });
});

describe('decode', () => {
  it('Should decode GSM7 buffer with `@` character to ASCII', () => {
    const asciiText = gsm7.decode(Buffer.from('D4F29C0E38B7C369B66BFC6E03', 'hex'));

    expect(asciiText).to.eql('Test@gmail.com');
  });
});

describe('decode', () => {
  it('Should decode GSM7 buffer to `This € is`', () => {
    const asciiText = gsm7.decode(Buffer.from('54747A0EDA9441E939', 'hex'));

    expect(asciiText).to.eql('This € is');
  });
});

describe('encode', () => {
  it('Should encode ASCII text to GSM7 buffer', () => {
    const buff = gsm7.encode('This ~is a ^test for GSM7 {decoder}');

    expect(buff).to.equalBytes('54747A0EDAF4D2735018B4A1D0CB733AC8FC96838ED3E60DB44191CBE337B92CDFA41A');
  });
});

describe('encode', () => {
  it('Should encode short ASCII text to GSM7 buffer', () => {
    const buff = gsm7.encode('Test134');

    expect(buff).to.equalBytes('D4F29C1E9BD11A');
  });
});

describe('encode', () => {
  it('Should encode short ASCII text ending with special character to GSM7 buffer', () => {
    const buff = gsm7.encode('Test12{');

    expect(buff).to.equalBytes('D4F29C1E936D50');
  });
});

describe('encode', () => {
  it('Should encode ASCII text ending with `@` character to GSM7 buffer', () => {
    const buff = gsm7.encode('Hi12345@');

    expect(buff).to.equalBytes('C8744C36A3D500');
  });
});

describe('encode', () => {
  it('Should encode ASCII text ending with `@` character to GSM7 buffer', () => {
    const buff = gsm7.encode('Hi@');

    expect(buff).to.equalBytes('C83400');
  });
});

describe('encode', () => {
  it('Should encode ASCII text with `@` character to GSM7 buffer', () => {
    const buff = gsm7.encode('Test@gmail.com');

    expect(buff).to.equalBytes('D4F29C0E38B7C369B66BFC6E03');
  });
});

describe('encode', () => {
  it('Should encode ASCII text to GSM7 buffer', () => {
    const buff = gsm7.encode('imo code: 7214');

    expect(buff).to.equalBytes('E9F61B347E93CB3AD04D16A301');
  });
});

describe('encode', () => {
  it('Should encode ASCII text less than 8 character', () => {
    const buff = gsm7.encode('Testing');

    expect(buff).to.equalBytes('D4F29C9E769F1B');
  });
});

describe('encode', () => {
  it('Should encode ASCII `@$has` GSM 7', () => {
    const buff = gsm7.encode('@$has');

    expect(buff).to.equalBytes('00013A3C07');
  });
});

describe('encode', () => {
  it('Should encode ASCII `@¥has @` GSM 7', () => {
    const buff = gsm7.encode('@¥has @');

    expect(buff).to.equalBytes('80013A3C07011A');
  });
});

describe('encode', () => {
  it('Should encode ASCII `@@test@@` GSM 7', () => {
    const buff = gsm7.encode('@@test@@');

    expect(buff).to.equalBytes('0000BD3CA70300');
  });
});

describe('encode', () => {
  it('Should encode ASCII `This € is`', () => {
    const buff = gsm7.encode('This € is');

    expect(buff).to.equalBytes('54747A0EDA9441E939');
  });
});
