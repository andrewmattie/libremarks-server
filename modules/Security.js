'use strict';

const jwt = require('jsonwebtoken');
const ApiToken = require('../models/ApiToken');
const Object = require('../modules/Object');

exports.signToken = (data, secretKey, options) => {
    return new Promise(function execute(resolve, reject) {
        const token = jwt.sign(data, secretKey, options);
        const apiToken = new ApiToken({
            uuid: data.uuid
        });

        apiToken.save(saveError => {
            if (saveError) {
                reject();
            }

            resolve(token);
        });
    });
};

exports.verifyToken = (rawToken, key) => {
    return new Promise(function execute(resolve, reject) {
        const token = jwt.verify(rawToken, key, { issuer: process.env.JWT_ISSUER });

        if (token.iss === process.env.JWT_ISSUER) {
            Object.find(ApiToken, { uuid: token.uuid }).then(tokenObject => {
                if (tokenObject.length <= 0) {
                    reject();
                } else {
                    resolve(token);
                }
            }).catch(tokenError => {
                reject();
            });
        } else {
            reject();
        }
    });
};