const mysqlconnection = require("../../database");
const { downloadtvinterposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF TV LIVE INTERNACIONAL
export const gettvliveinter = (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_LIVE_INTER(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const getselecttvliveinter = (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SELECT_CAT_CATEGORY_TVINTER(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}
// GET CATALOG OF TV LIVE INTERNACIONAL BY ID
export const gettvliveinterById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_LIVE_INTER_COD(?,?)', [COD,ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF TV LIVE INTERNACIONAL
export const createtvliveinter = (req, res) => {
    const { COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG,
        COD_SERVER_EPG, COD_EPG, TITLE, POSTER, URL, SERVER_EPG, EPG_NOW,
        EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD_CONTENIDO } = req.body;
        const urlimgposter = req.body.POSTER
        const extensionfront = 'poster.jpg';
        const nameimgposter = req.body.COD_CATEGORY + req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
        // ruta de la imagen en el servidor
        const port = process.env.DOMINIO;
        const imagposter = process.env.RUTAIMAGETVINTERPOSTER
        const urlposter = port + imagposter + nameimgposter;
        downloadtvinterposter(urlimgposter, nameimgposter, function () {
            console.log('done');
        });
    const query = 'CALL PROC_INS_LIVETV_INTER(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    mysqlconnection.query(query, [COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG, COD_SERVER_EPG,
        COD_EPG, TITLE, urlposter, URL, SERVER_EPG, EPG_NOW, EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD_CONTENIDO
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV LIVE INTERNACIONAL ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE CATALOG OF TV LIVE INTERNACIONAL
export const updatetvliveinterById = (req, res) => {
    const { COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG,
        COD_SERVER_EPG, COD_EPG, TITLE, POSTER, URL, SERVER_EPG, EPG_NOW,
        EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON } = req.body;
    const { COD, ID } = req.params;
    const urlimgposter = req.body.POSTER
    const extensionfront = 'poster.jpg';
    const nameimgposter = req.body.COD + req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
    // ruta de la imagen en el servidor
    const port = process.env.DOMINIO;
    const imagposter = process.env.RUTAIMAGETVINTERPOSTER
    const urlposter = port + imagposter + nameimgposter;
    downloadtvinterposter(urlimgposter, nameimgposter, function () {
        console.log('done');
    });
    mysqlconnection.query("CALL PROC_UPD_LIVETV_INTER(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG, COD_SERVER_EPG,
            COD_EPG, TITLE, urlposter, URL, SERVER_EPG, EPG_NOW, EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD, ID
        ],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV LIVE INTERNACIONAL UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF TV LIVE EN
export const deletetvliveinterById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_LIVETV_INTER(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "TV LIVE INTERNACIONAL DELETED"
                });
            } else {
                console.log(err);
            }
        });
};