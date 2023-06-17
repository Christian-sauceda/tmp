const mysqlconnection = require("../../database");
const { downloadserieenback, downloadserieenposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF TV SHOWS EN
export const gettvshowsen = (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_TVSHOW_EN(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const getselecttvshowsen = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SELECT_TVSHOW_EN(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const countserieen = async (req, res) => {
    const {
        ID
    } = req.params;
    mysqlconnection.query("CALL PROC_COUNTSERIEEN(?)",
        [ID], (err, rows, fields) => {
            if (!err) {
                res.status(200).json(rows[0]);
            } else {
                console.log(req.body);
            }
        });
}

export const gettvshowsenlastday = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_SERIESENLASTDAY(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF TV SHOW EN BY ID
export const gettvshowsenById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_TVSHOW_EN_COD(?,?)', [COD, ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF TV SHOW EN
export const createtvshowsen = (req, res) => {
    const { CODAUDIO, CODCATEGORY, CODUSER, TITLE, TITLE_LATIN, BACK, POSTER, YEAR,
        CLASIF, COUNTRY, CALIF, DIRECTOR, CAST, SYNOPSIS, COD_CONTENIDO } = req.body;

    const urlimgback = req.body.BACK
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadserieenback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGESERIEENBACK
    const imagposter = process.env.RUTAIMAGESERIEENPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;
    downloadserieenposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });

    const query = 'CALL PROC_INS_TVSHOW_EN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    mysqlconnection.query(query, [CODAUDIO, CODCATEGORY, CODUSER, TITLE, TITLE_LATIN, urlback,
        urlposter, YEAR, CLASIF, COUNTRY, CALIF, DIRECTOR, CAST, SYNOPSIS, COD_CONTENIDO
    ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV SHOW IN ENGLISH ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE CATALOG OF TV SHOW EN
export const updatetvshowsenById = (req, res) => {
    const { CODAUDIO, CODCATEGORY, CODUSER, TITLE, TITLE_LATIN, BACK, POSTER, YEAR,
        CLASIF, COUNTRY, CALIF, DIRECTOR, CAST, SYNOPSIS } = req.body;
    const { COD, ID } = req.params;
    const urlimgback = req.body.BACK
    const extensionback = 'back.jpg';
    const extensionfront = 'poster.jpg';
    const nameimgback = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionback);
    const urlimgposter = req.body.POSTER
    const nameimgposter = req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    downloadserieenback(urlimgback, nameimgback, function () {
        console.log('done');
    });
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagback = process.env.RUTAIMAGESERIEENBACK
    const imagposter = process.env.RUTAIMAGESERIEENPOSTER
    const urlback = port + imagback + nameimgback;
    const urlposter = port + imagposter + nameimgposter;
    downloadserieenposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });
    mysqlconnection.query("CALL PROC_UPD_TVSHOW_EN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [CODAUDIO, CODCATEGORY, CODUSER, TITLE, TITLE_LATIN, urlback, urlposter,
            YEAR, CLASIF, COUNTRY, CALIF, DIRECTOR, CAST, SYNOPSIS, COD, ID
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV SHOW IN ENGLISH UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF TV SHOW EN
export const deletetvshowsenById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_TVSHOW_EN(?,?)',
        [COD, ID],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV SHOW IN ENGLISH DELETED"
                });
            } else {
                console.log(err);
            }
        });
};