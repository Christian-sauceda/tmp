const mysqlconnection = require("../../database");

// GET ALL CATALOG OF FORMAT VIDEO
export const getCatformartvideo = async (req, res) => {
    mysqlconnection.query("CALL PROC_SEL_CAT_FORMAT_VIDEO()", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF FORMAT VIDEO BY ID
export const getCatformartvideoById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_CAT_FORMAT_VIDEO_COD(?)', [COD], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF FORMAT VIDEO
export const createCatformartvideo = (req, res) => {
    const {
        FORMATO
    } = req.body;
    const query = `CALL PROC_INS_CAT_FORMAT_VIDEO(?);`;
    mysqlconnection.query(query, [FORMATO], (err, rows, fields) => {
        if (!err) {
            //retornar el registro insertado
            res.status(200).json(req.body);
        } else {
            console.log(req.body);
        }
    });
};

// UPDATE CATALOG OF FORMAT VIDEO
export const updateCatformartvideoById = (req, res) => {
    const {
        FORMATO
    } = req.body;
    const {
        COD
    } = req.params;
    mysqlconnection.query("CALL PROC_UPD_CAT_FORMAT_VIDEO(?,?)",
        [FORMATO, COD], (err, rows, fields) => {
            if (!err) {
                //retornar el registro insertado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF FORMAT VIDEO
export const deleteCatformartvideoById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_CAT_FORMAT_VIDEO(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "CATALOG OF FORMAT VIDEO DELETED"
                });
            } else {
                console.log(err);
            }
        });
};