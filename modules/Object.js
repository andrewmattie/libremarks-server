'use strict';

exports.find = (SchemaObject, filter) => {
    return new Promise(function execute(resolve, reject) {
        SchemaObject.find(filter, (error, object) => {
            if (error) {
                return reject(error);
            } else {
                resolve(object);
            }
        }).select;
    });
};

exports.find = (SchemaObject, filter, columns) => {
    return new Promise(function execute(resolve, reject) {
        const query = SchemaObject.find(filter).select(columns);
        query.exec((error, object) => {
            if (error) {
                return reject(error);
            } else {
                resolve(object);
            }
        });
    });
};

exports.findAll = (SchemaObject) => {
    return new Promise(function execute(resolve, reject) {
        SchemaObject.find((error, object) => {
            if (error) {
                return reject(error);
            } else {
                resolve(object);
            }
        });
    });
};