const mysqlconnection = require("../../database");
const { downloadeventposter } = require('../downloadimage.controllers/img.controllers');

// GET ALL CATALOG OF EVENTS
export const getevents = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_SEL_ALL_EVENT(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET MOVIE ADULT EN BY ID
export const geteventById = (req, res) => {
    const {
        COD,
        ID
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_ALL_EVENT_COD(?,?)', [COD,ID], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

export const getselectevent = async (req, res) => {
    const {
        ID
    } = req.params;
    mysqlconnection.query("CALL PROC_SELECT_CAT_CATEGORY_EVENT(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

export const countevent = async (req, res) => {
    const {
        ID
    } = req.params;
    mysqlconnection.query("CALL PROC_COUNTEVENT(?)",
    [ID],(err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(req.body);
        }
    });
}

// CREATE MOVIE ADULT
export const createevent = (req, res) => {
    const { COD_AUDIO, COD_CATEGORIA, COD_CONTENIDO, COD_USER, TITLE,
        POSTER, URL, COD_FORMAT_VIDEO } = req.body;
        const urlimgposter = req.body.POSTER
        const extensionfront = 'poster.jpg';
        const nameimgposter = req.body.COD_AUDIO + req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
        // ruta de la imagen en el servidor
        const port = process.env.DOMINIO;
        const imagposter = process.env.RUTAIMAGEEVENTPOSTER
        const urlposter = port + imagposter + nameimgposter;
        downloadeventposter(urlimgposter, nameimgposter, function () {
            console.log('done');
        });
    const query = `CALL PROC_INS_EVENT(?,?,?,?,?,?,?,?)`;
    mysqlconnection.query(query, [ COD_AUDIO, COD_CATEGORIA,COD_CONTENIDO, 
    COD_USER, TITLE, urlposter, URL, COD_FORMAT_VIDEO],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "EVENT ADDED"
                });
            } else {
                console.log(req.body);
            }
        });
};

// UPDATE MOVIE ADULT
export const updateeventById = (req, res) => {
    const { COD_AUDIO, COD_CATEGORIA, COD_CONTENIDO, COD_USER, TITLE, POSTER, COD_FORMAT_VIDEO, URL } = req.body;
    const { COD } = req.params;
    const urlimgposter = req.body.POSTER
    const extensionfront = 'poster.jpg';
        const nameimgposter = req.body.COD_AUDIO + req.body.TITLE.split("?").join("").split("¿").join("").concat(extensionfront);
        // ruta de la imagen en el servidor
        const port = process.env.DOMINIO;
        const imagposter = process.env.RUTAIMAGEEVENTPOSTER
        const urlposter = port + imagposter + nameimgposter;
        downloadeventposter(urlimgposter, nameimgposter, function () {
            console.log('done');
        });
    mysqlconnection.query("CALL PROC_UPD_EVENT(?,?,?,?,?,?,?,?,?)",
        [COD_AUDIO, COD_CATEGORIA, COD_CONTENIDO, COD_USER, TITLE, urlposter, COD_FORMAT_VIDEO, URL, COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "EVENT UPDATED"
                });
            } else {
                console.log(err);
            }
        });
};

// DELETE MOVIE ADULT
export const deleteeventById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_EVENT(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "EVENT DELETED"
                });
            } else {
                console.log(err);
            }
        });
};