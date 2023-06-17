const mysqlconnection = require("../../database");
const { downloadmovieesback, downloadmovieesposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF MOVIES
export const getmoviees = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_MOVIE_ES(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const countmoviees = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_COUNTMOVIEES(?)",
    [ID],(err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(req.body);
        }
    });
}

export const getmovieeslastday = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_MOVIEESLASTDAY(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF MOVIE BY ID
export const getmovieesById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_MOVIE_ES_COD(?,?)', [COD,ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF MOVIE
export const createmoviees = (req, res) => {
    const { CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR, CLASIF, DURATION, COUNTRY, CALIF,
        DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO, TITLE_LATIN } = req.body;

    const urlimgback = req.body.BACK;

        const extensionback = 'back.jpg';
        const extensionfront = 'poster.jpg';

    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadmovieesback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGEMOVIESBACK
    const imagposter = process.env.RUTAIMAGEMOVIESPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;

    downloadmovieesposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });

    const query = `CALL PROC_INS_MOVIE_ES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    mysqlconnection.query(query, [CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE_LATIN, urlback, urlposter,
        YEAR, CLASIF, DURATION, COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO, TITLE
    ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE IN SPANISH ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE CATALOG OF MOVIE
export const updatemovieesById = (req, res) => {
    const {
        CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR, CLASIF, DURATION,
        COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS } = req.body;
    const { COD, ID } = req.params;

    const urlimgback = req.body.BACK
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadmovieesback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGEMOVIESBACK
    const imagposter = process.env.RUTAIMAGEMOVIESPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;

    downloadmovieesposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });

    mysqlconnection.query("CALL PROC_UPD_MOVIE_ES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, urlback, urlposter, YEAR, CLASIF, DURATION, COUNTRY, CALIF,
            DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD, ID
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE IN SPANISH UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF MOVIE
export const deletemovieesById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_MOVIE_ES(?,?)', [COD, ID],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE IN SPANISH DELETED"
                });
            } else {
                console.log(err);
            }
        });
};