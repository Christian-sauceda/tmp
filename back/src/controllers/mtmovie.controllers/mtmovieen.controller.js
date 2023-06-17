const mysqlconnection = require("../../database");
const { downloadmovieenback, downloadmovieenposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF MOVIES EN
export const getmovieen = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_MOVIE_EN(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const countmovieen = async (req, res) => {
    const {
        ID
    } = req.params;
    mysqlconnection.query("CALL PROC_COUNTMOVIEEN(?)", 
    [ID],(err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(req.body);
        }
    });
}

// GET CATALOG OF MOVIE EN BY ID
export const getmovieenById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_MOVIE_EN_COD(?,?)', [COD,ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

export const getmovieenlastday = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_MOVIEENLASTDAY(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// CREATE CATALOG OF MOVIE EN
export const createmovieen = (req, res) => {
    const { CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER,
        YEAR, CLASIF, DURATION, COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN,
        CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO } = req.body;

    const urlimgback = req.body.BACK;
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadmovieenback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGEMOVIEENBACK
    const imagposter = process.env.RUTAIMAGEMOVIEENPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;
    downloadmovieenposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });

    const query = `CALL PROC_INS_MOVIE_EN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    mysqlconnection.query(query, [CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, urlback, urlposter,
        YEAR, CLASIF, DURATION, COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO
    ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE IN ENGLISH ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE CATALOG OF MOVIE EN
export const updatemovieenById = (req, res) => {
    const {
        CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR,
        CLASIF, DURATION, COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN,
        CODFORMATVIDEO, URL, SYNOPSIS } = req.body;
    const { COD, ID } = req.params;

    const urlimgback = req.body.BACK
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    // REMPLAZAR EL ¿ Y ? POR UN ESPACIO EN BLANCO
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadmovieenback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGEMOVIEENBACK
    const imagposter = process.env.RUTAIMAGEMOVIEENPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;
    downloadmovieenposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });
    mysqlconnection.query("CALL PROC_UPD_MOVIE_EN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, urlback, urlposter, YEAR, CLASIF, DURATION, COUNTRY, CALIF,
            DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD, ID
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE IN ENGLISH UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF MOVIE EN
export const deletemovieenById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_MOVIE_EN(?,?)', [COD, ID],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "MOVIE IN ENGLISH DELETED"
                });
            } else {
                console.log(err);
            }
        });
};