# elsie-four-cipher

[![npm version](https://badge.fury.io/js/elsie-four-cipher.svg)](https://badge.fury.io/js/elsie-four-cipher)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c24d888bae2e416b9160277a76360686)](https://www.codacy.com/app/Gavin-Song/elsie-four-cipher?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Gavin-Song/elsie-four-cipher&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/Gavin-Song/elsie-four-cipher.svg?branch=master)](https://travis-ci.org/Gavin-Song/elsie-four-cipher)

A node.js implementation of the ElsieFour (LC4) cipher (https://eprint.iacr.org/2017/339.pdf). Currently supports encryption and decryption, but not the nonce or signature auth.

### Install
`npm install elsie-four-cipher --save`

### Example
```javascript
const cipher = require('elsie-four-cipher');

// encrypt(key, message). This example returns tk5j23tq94_gw9c#lhzs
cipher.encrypt('s2ferw_nx346ty5odiupq#lmz8ajhgcvk79b', 'aaaaaaaaaaaaaaaaaaaa');

// decrypt (key, message). This example returns aaaaaaaaaaaaaaaaaaaa
cipher.decrypt('s2ferw_nx346ty5odiupq#lmz8ajhgcvk79b', 'tk5j23tq94_gw9c#lhzs');
```

### What is ElsieFour?
> ElsieFour (LC4) is a low-tech cipher that can be computed by hand;
but unlike many historical ciphers, LC4 is designed to be hard to break. LC4 is in
tended for encrypted communication between humans only, and therefore it encrypts 
and decrypts plaintexts and ciphertexts consisting only of the English letters 
A through Z plus a few other characters

In other words, it's a cipher that can be easily computed by hand. It uses a grid of the following alphabet:
`#_23456789abcdefghijklmnopqrstuvwxyz`
In some combination (a key). This grid is operated on depending on the value of the square and the location of a marker that starts in the top right corner. (See the paper for a detailed explaination. There is a tutorial with images near the end of the paper)


### Test
`npm test`

### License
This project is under the MIT License (See LICENSE)
