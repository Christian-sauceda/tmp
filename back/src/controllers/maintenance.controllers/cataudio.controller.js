import 'regenerator-runtime/runtime';
const mysqlconnection = require("../../database");

// GET ALL CATALOG OF AUDIO
export const getCataudio = async (req, res) => {
    mysqlconnection.query("CALL PROC_SEL_CAT_AUDIO()", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF AUDIO BY ID
export const getCataudioById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_CAT_AUDIO_COD(?)', [COD], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF AUDIO
export const createCataudio = (req, res) => {
    const {
        AUDIO
    } = req.body;
    const query = `CALL PROC_INS_CAT_AUDIO(?);`;
    mysqlconnection.query(query, [AUDIO], (err, rows, fields) => {
        if (!err) {
            //retornar el registro insertado
            res.status(200).json(req.body);
        } else {
            console.log(req.body);
        }
    });
};

// UPDATE CATALOG OF AUDIO
export const updateCataudioById = (req, res) => {
    const {
        AUDIO
    } = req.body;
    const {
        COD
    } = req.params;
    mysqlconnection.query(
        "CALL PROC_UPD_CAT_AUDIO(?,?)",
        [AUDIO, COD],
        (err, rows, fields) => {
            if (!err) {
                //retornar el registro insertado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF AUDIO
export const deleteCataudioById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_CAT_AUDIO(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "CATALOG OF AUDIO DELETED"
                });
            } else {
                console.log(err);
            }
        });
};
