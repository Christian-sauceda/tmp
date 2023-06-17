const mysqlconnection = require("../../database");
const { downloadtvenposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF TV LIVE EN
export const gettvliveen = (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_LIVE_EN(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const getselecttvliveen = (req, res) => {
    const {
        ID
    } = req.params;
    mysqlconnection.query("CALL PROC_SELECT_CAT_CATEGORY_TVEN(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF TV LIVE EN BY ID
export const gettvliveenById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_LIVE_EN_COD(?,?)', [COD, ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF TV LIVE EN
export const createtvliveen = (req, res) => {
    const { COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG,
        COD_SERVER_EPG, COD_EPG, TITLE, POSTER, URL, SERVER_EPG, EPG_NOW,
        EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD_CONTENIDO } = req.body;
        const urlimgposter = req.body.POSTER
        const extensionfront = 'poster.jpg';
        const nameimgposter = req.body.COD_CATEGORY + req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
        // ruta de la imagen en el servidor
        const port = process.env.DOMINIO;
        const imagposter = process.env.RUTAIMAGETVENPOSTER
        const urlposter = port + imagposter + nameimgposter;
        downloadtvenposter(urlimgposter, nameimgposter, function () {
            console.log('done');
        });
    const query = 'CALL PROC_INS_LIVETV_EN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    mysqlconnection.query(query, [COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG, COD_SERVER_EPG,
        COD_EPG, TITLE, urlposter, URL, SERVER_EPG, EPG_NOW, EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD_CONTENIDO
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV LIVE IN ENGLISH ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE CATALOG OF TV LIVE EN
export const updatetvliveenById = (req, res) => {
    const { COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG,
        COD_SERVER_EPG, COD_EPG, TITLE, POSTER, URL, SERVER_EPG, EPG_NOW,
        EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON } = req.body;
    const { COD, ID } = req.params;
    const urlimgposter = req.body.POSTER
    const extensionfront = 'poster.jpg';
    const nameimgposter = req.body.COD + req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagposter = process.env.RUTAIMAGETVENPOSTER
    const urlposter = port + imagposter + nameimgposter;
    downloadtvenposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });
    mysqlconnection.query("CALL PROC_UPD_LIVETV_EN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG, COD_SERVER_EPG,
            COD_EPG, TITLE, urlposter, URL, SERVER_EPG, EPG_NOW, EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD, ID
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV LIVE IN ENGLISH UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF TV LIVE EN
export const deletetvliveenById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_LIVETV_EN(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV LIVE IN ENGLISH DELETED"
                });
            } else {
                console.log(err);
            }
        });
};