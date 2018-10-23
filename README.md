
# gsm7

A GSM7 encoder and decoder that transcodes between ASCII and GSM7 which is used in as a default encoding for SMS transmission in GSM netwroks
## Installation

```
npm install --save gsm7
```

## Usage

Decoding:

```
const gsm7 = require('gsm7');

const asciiText = gsm7.decode(Buffer.from('54747A0EDAF4D2735018B4A1D0CB733AC8FC96838ED3E60DB44191CBE337B92CDFA45C', 'hex'));
```

Encoding:

```
const buff = gsm7.encode('This ~is a ^test for GSM7 {decoder}.');
```
