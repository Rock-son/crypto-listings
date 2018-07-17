"use strict"

module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000); // mocha assumes fail after 2s
}

module.exports.square = (x) => x * x;
