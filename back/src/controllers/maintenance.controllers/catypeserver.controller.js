const mysqlconnection = require("../../database");

// GET ALL CATALOG OF TYPE SERVER
export const getCatypeServer = async (req, res) => {
    mysqlconnection.query("CALL PROC_SEL_CAT_TYPE_SERVER()", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF TYPE SERVER BY ID
export const getCatypeServerById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_CAT_TYPE_SERVER_COD(?)', [COD], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF TYPE SERVER
export const createCatypeServer = (req, res) => {
    const {
        NAME,
        URL
    } = req.body;
    const query = `CALL PROC_INS_CAT_TYPE_SERVER(?,?);`;
    mysqlconnection.query(query, [NAME, URL], (err, rows, fields) => {
        if (!err) {
            //retornar el registro insertado
            res.status(200).json(req.body);
        } else {
            console.log(req.body);
        }
    });
};

// UPDATE CATALOG OF TYPE SERVER
export const updateCatypeServerById = (req, res) => {
    const {
        NAME_TYPE_SERVER,
        URL
    } = req.body;
    const {
        COD
    } = req.params;
    mysqlconnection.query("CALL PROC_UPD_CAT_TYPE_SERVER(?,?,?)",
        [NAME_TYPE_SERVER, URL, COD], (err, rows, fields) => {
            if (!err) {
                //retornar el registro insertado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF TYPE SERVER
export const deleteCatypeServerById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_CAT_TYPE_SERVER(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "CATALOG OF TYPE SERVER DELETED"
                });
            } else {
                console.log(err);
            }
        });
};