require('dotenv').config();
const fs = require('fs')
const request = require('request');
let imagbackes = process.env.RUTAIMAGEMOVIESBACK
let imagposteres = process.env.RUTAIMAGEMOVIESPOSTER

let imagbacken = process.env.RUTAIMAGEMOVIEENBACK
let imagposteren = process.env.RUTAIMAGEMOVIEENPOSTER

let imgbackadult = process.env.RUTAIMAGEMOVIEADULTBACK
let imgposteradult = process.env.RUTAIMAGEMOVIEADULTPOSTER

let imgbackseriees = process.env.RUTAIMAGESERIEESBACK
let imgposteries = process.env.RUTAIMAGESERIEESPOSTER

let imgbackserieen = process.env.RUTAIMAGESERIEENBACK
let imgposterien = process.env.RUTAIMAGESERIEENPOSTER

let imgbackcapserie = process.env.RUTAIMAGECAPSERIEBACK
let imgpostercapserie = process.env.RUTAIMAGECAPSERIEPOSTER
//--------------------------------------------------------
let imgbackevent = process.env.RUTAIMAGEEVENTBACK
let imgposterevent = process.env.RUTAIMAGEEVENTPOSTER

let imgbacktves = process.env.RUTAIMAGETVESBACK
let imgpostertves = process.env.RUTAIMAGETVESPOSTER

let imgbacktven = process.env.RUTAIMAGETVENBACK
let imgpostertven = process.env.RUTAIMAGETVENPOSTER

let imgbacktvinter = process.env.RUTAIMAGETVINTERBACK
let imgpostertvinter = process.env.RUTAIMAGETVINTERPOSTER

// Descarga de imagen pelicula en español backdrops
export const downloadmovieesback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imagbackes + filename)).on('close', callback);
    });
};

// Descarga de imagen pelicula en español poster
export const downloadmovieesposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imagposteres + filename)).on('close', callback);
    });
};

// Descarga de imagen pelicula en ingles backdrops
export const downloadmovieenback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imagbacken + filename)).on('close', callback);
    });
};

// Descarga de imagen pelicula en ingles poster
export const downloadmovieenposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imagposteren + filename)).on('close', callback);
    });
};

// Descarga de imagen adulto backdrops
export const downloadmovieadultback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbackadult + filename)).on('close', callback);
    });
};

// Descarga de imagen adulto poster
export const downloadmovieadultposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgposteradult + filename)).on('close', callback);
    });
};

// Descarga de imagen serie español backdrops
export const downloadserieesback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbackseriees + filename)).on('close', callback);
    });
};

// Descarga de imagen serie español poster
export const downloadserieesposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgposteries + filename)).on('close', callback);
    });
};

// Descarga de imagen serie ingles backdrops
export const downloadserieenback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbackserieen + filename)).on('close', callback);
    });
};

// Descarga de imagen serie ingles poster
export const downloadserieenposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgposterien + filename)).on('close', callback);
    });
};

// Descarga de imagen capitulo serie backdrops
export const downloadcapserieback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbackcapserie + filename)).on('close', callback);
    });
};

// Descarga de imagen capitulo serie poster
export const downloadcapserieposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgpostercapserie + filename)).on('close', callback);
    });
};

// Descarga de imagen evento backdrops
export const downloadeventback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbackevent + filename)).on('close', callback);
    });
};

// Descarga de imagen evento poster
export const downloadeventposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgposterevent + filename)).on('close', callback);
    });
};

// Descarga de imagen tv es backdrops
export const downloadtvesback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbacktves + filename)).on('close', callback);
    });
};

// Descarga de imagen tv es poster
export const downloadtvesposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgpostertves + filename)).on('close', callback);
    });
};

// Descarga de imagen tv en backdrops
export const downloadtvenback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbacktven + filename)).on('close', callback);
    });
};

// Descarga de imagen tv en poster
export const downloadtvenposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgpostertven + filename)).on('close', callback);
    });
};

// Descarga de imagen tv inter backdrops
export const downloadtvinterback = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgbacktvinter + filename)).on('close', callback);
    });
};

// Descarga de imagen tv inter poster
export const downloadtvinterposter = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream('.' + imgpostertvinter + filename)).on('close', callback);
    });
};