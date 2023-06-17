const mysqlconnection = require("../../database");
const { downloadmovieadultback, downloadmovieadultposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF MOVIE ADULT
export const getmovieadult = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_MOVIE_ADULT(?)", [ ID ], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const countmovieadult = async (req, res) => {
    const {
        ID
    } = req.params;
    mysqlconnection.query("CALL PROC_COUNTMOVIEADULT(?)",
    [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(req.body);
        }
    });
}

export const getmovieadultlastday = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_ADULTLASTDAY(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET MOVIE ADULT EN BY ID
export const getmovieadultById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_MOVIE_ADULT_COD(?,?)', [COD, ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE MOVIE ADULT
export const createmovieadult = (req, res) => {
    const {
        CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR,
        DURATION, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO } = req.body;

    const urlimgback = req.body.BACK
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadmovieadultback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGEMOVIEADULTBACK
    const imagposter = process.env.RUTAIMAGEMOVIEADULTPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;
    downloadmovieadultposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });

    const query = `CALL PROC_INS_MOVIE_ADULT(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    mysqlconnection.query(query, [CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, urlback, urlposter, YEAR, DURATION,
            CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE ADULT ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE MOVIE ADULT
export const updatemovieadultById = (req, res) => {
    const { CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR,
        DURATION, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO } = req.body;
    const { COD } = req.params;
    const urlimgback = req.body.BACK
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadmovieadultback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGEMOVIEADULTBACK
    const imagposter = process.env.RUTAIMAGEMOVIEADULTPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;
    downloadmovieadultposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });
    mysqlconnection.query("CALL PROC_UPD_MOVIE_ADULT(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, urlback, urlposter, YEAR, DURATION,
            CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO, COD
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE ADULT UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE MOVIE ADULT
export const deletemovieadultById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_MOVIE_ADULT(?,?)',
    [COD, ID],
    (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE ADULT DELETED"
                });
            } else {
                console.log(err);
            }
        });
};