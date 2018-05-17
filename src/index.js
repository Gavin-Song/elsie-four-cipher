'use strict';

const Key = require('./key.js');
const config = require('./config.js');

/**
 * removeNonAlphabet - Removes all letters from
 * string not present in alphabet
 *
 * @param  {string} string   String to edit
 * @param  {string} alphabet Alphabet to use
 * @return {string}          Editted string
 */
function removeNonAlphabet(string, alphabet) {
    return Array.from(string).filter(x => alphabet.indexOf(x) !== -1).join('');
}

module.exports = {
        /**
         * encrypt - Encrypt a message using the ElsieFour
         * Cipher.
         *
         * @param  {string} key     key, a 36 letter permutation of config.alphabet
         * @param  {string} message message to encrypt. Must only use characters
         *                          defined in config.alphabet. Any letters
         *                          not in the alphabet WILL be removed
         * @return {string}         encrypted text (cipher text)
         */
        encrypt: function(key, message) {
            message = removeNonAlphabet(message, config.alphabet);

            let cipher_text = '';
            let ciph = new Key(key);

            for (let letter of message) {
                cipher_text += ciph.encrypt(letter);
            }

            return cipher_text;
        },

        /**
         * decrypt - Decrypt a message using the ElsieFour
         * Cipher
         *
         * @param  {string} key     key, a 36 letter permutation of config.alphabet
         * @param  {string} message message to decrypt. Must only use characters
         *                          defined in config.alphabet. Any letters
         *                          not in the alphabet WILL be removed
         * @return {string}         decrypted text (plain text)
         */
        decrypt: function(key, message) {
            message = removeNonAlphabet(message, config.alphabet);

            let plain_text = '';
            let ciph = new Key(key);

            for (let letter of message) {
                plain_text += ciph.decrypt(letter);
            }

            return plain_text;
        }
};
