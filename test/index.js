const gsm7 = require('../index.js');
const expect = require('chai').use(require('chai-bytes')).expect;

describe('decode', () => {
  it('Should decode GSM7 buffer to ASCII text', () => {
    const asciiText = gsm7.decode(Buffer.from('54747A0EDAF4D2735018B4A1D0CB733AC8FC96838ED3E60DB44191CBE337B92CDFA45C', 'hex'));

    expect(asciiText).to.eql('This ~is a ^test for GSM7 {decoder}.');
  });
});

describe('encode', () => {
  it('Should encode ASCII text to GSM7 buffer', () => {
    const buff = gsm7.encode('This ~is a ^test for GSM7 {decoder}.');

    expect(buff).to.equalBytes('54747A0EDAF4D2735018B4A1D0CB733AC8FC96838ED3E60DB44191CBE337B92CDFA45C');
  });
});
