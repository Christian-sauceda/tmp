const mysqlconnection = require("../../database");

// GET ALL CATALOG OF QUALITY
export const getCatQuality = async (req, res) => {
    mysqlconnection.query("CALL PROC_SEL_CAT_QUALITY()", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF QUALITY BY ID
export const getCatQualityById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_CAT_QUALITY_COD(?)', [COD], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF QUALITY
export const createCatQuality = (req, res) => {
    const {
        CALIDAD
    } = req.body;
    const query = `CALL PROC_INS_CAT_QUALITY(?);`;
    mysqlconnection.query(query, [CALIDAD], (err, rows, fields) => {
        if (!err) {
                //retornar el registro insertado
                res.status(200).json(req.body);
        } else {
            console.log(req.body);
        }
    });
};

// UPDATE CATALOG OF QUALITY
export const updateCatQualityById = (req, res) => {
    const {
        CALIDAD
    } = req.body;
    const {
        COD
    } = req.params;
    mysqlconnection.query("CALL PROC_UPD_CAT_QUALITY(?,?)",
        [CALIDAD, COD], (err, rows, fields) => {
            if (!err) {
                //retornar el registro insertado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF QUALITY
export const deleteCatQualityById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_CAT_QUALITY(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "CATALOG OF QUALITY DELETED"
                });
            } else {
                console.log(err);
            }
        });
};