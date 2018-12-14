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
