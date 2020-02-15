/**
 * Copyright 2018 by Andrew Mattie
 * 
 * Permission to use, copy, modify, and distribute this software and its documentation for any purpose 
 * and without fee is hereby granted, provided that the above copyright notice appear in all copies and 
 * that both the copyright notice and this permission notice and warranty disclaimer appear in supporting 
 * documentation, and that the names of the authors or their employers not be used in advertising or 
 * publicity pertaining to distribution of the software without specific, written prior permission.
 * 
 * The authors and their employers disclaim all warranties with regard to this software, including all implied 
 * warranties of merchantability and fitness. In no event shall the authors or their employers be liable for any 
 * special, indirect or consequential damages or any damages whatsoever resulting from loss of use, data or profits, 
 * whether in an action of contract, negligence or other tortious action, arising out of or in connection with the 
 * use or performance of this software.
 */

const crypto = require('crypto');

/**
 * Uses an IV to encrypt data without repetiveness.
 * 
 * @param {*} key Encryption key (32 char in length)
 * @param {*} object Item to be encrypted 
 */
exports.encryptWithIV = (key, object) => {
    return new Promise(function (resolve) {
        const iv = new Buffer(crypto.randomBytes(16));
        const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

        let crypted = cipher.update(object, 'utf8', 'hex');
        crypted += cipher.final('hex');

        resolve(`${iv.toString('hex')}:${crypted.toString()}`);
    });
}

/**
 * Decrypt IV encrypted data
 * 
 * @param {*} key Encryption key (32 char in length)
 * @param {*} object Item to be encrypted
 */
exports.decryptWithIV = (key, object) => {
    return new Promise(function (resolve) {
        const textParts = object.split(':');
        const IV = new Buffer(textParts.shift(), 'hex');
        const encryptedText = new Buffer(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-ctr', key, IV);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        resolve(decrypted.toString());
    });
}

/**
 * WARNING: Depricated
 * 
 * Encrypt without the use of an IV. Allows for same outcome of encrypted data.
 * 
 * @param {*} key Encryption key (32 char in length)
 * @param {*} object Item to be encrypted
 */
exports.encryptWeakly = (key, object) => {
    return new Promise(function (resolve) {
        const cipher = crypto.createCipher('aes-256-ctr', key);
        let crypted = cipher.update(object, 'utf8', 'hex');

        crypted += cipher.final('hex');

        resolve(crypted);
    });
}

/**
 * WARNING: Depricated
 * 
 * Decrypt without the use of an IV. Allows for same outcome of encrypted data.
 * 
 * @param {*} key Encryption key (32 char in length)
 * @param {*} object Item to be decrypted
 */
exports.decryptWeakly = (key, object) => {
    return new Promise(function (resolve) {
        const decipher = crypto.createDecipher('aes-256-ctr', key);
        let dec = decipher.update(object, 'hex', 'utf8');

        dec += decipher.final('utf8');

        resolve(dec);
    });
}