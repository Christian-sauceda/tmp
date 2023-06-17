const mysqlconnection = require("../../database");

// GET ALL CATALOG OF TYPE CONTENT
export const getCatypeContent = async (req, res) => {
    mysqlconnection.query("CALL PROC_SEL_CAT_TYPE_CONTENT()", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF TYPE CONTENT BY ID
export const getCatypeContentById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_CAT_TYPE_CONTENT_COD(?)', [COD], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(req.body);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF TYPE CONTENT
export const createCatypeContent = (req, res) => {
    const {
        CONTENIDO
    } = req.body;
    const query = `CALL PROC_INS_CAT_TYPE_CONTENT(?);`;
    mysqlconnection.query(query, [CONTENIDO], (err, rows, fields) => {
        if (!err) {
            //retornar el registro insertado
            res.status(200).json(req.body);
        } else {
            console.log(req.body);
        }
    });
};

// UPDATE CATALOG OF TYPE CONTENT
export const updateCatypeContentById = (req, res) => {
    const {
        CONTENIDO
    } = req.body;
    const {
        COD
    } = req.params;
    mysqlconnection.query("CALL PROC_UPD_CAT_TYPE_CONTENT(?,?)",
        [CONTENIDO, COD], (err, rows, fields) => {
            if (!err) {
            //retornar el registro insertado
            res.status(200).json(req.body);
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF TYPE CONTENT
export const deleteCatypeContentById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_CAT_TYPE_CONTENT(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "CATALOG OF TYPE CONTENT DELETED"
                });
            } else {
                console.log(err);
            }
        });
};