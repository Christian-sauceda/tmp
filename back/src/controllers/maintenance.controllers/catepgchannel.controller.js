const mysqlconnection = require("../../database");

// GET ALL CATALOG OF EPG CHANNEL
export const getCatepgchannel = async (req, res) => {
    mysqlconnection.query("CALL PROC_SEL_CAT_EPG_CHANNEL()", (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// GET CATALOG OF EPG CHANNEL BY ID
export const getCatepgchannelById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_SEL_CAT_EPG_CHANNEL_COD(?)', [COD], (err,
        rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
};

// CREATE CATALOG OF EPG CHANNEL
export const createCatepgchannel = (req, res) => {
    const {
        COD_EPG,
        COD_SERVER,
        NAME_CHANNEL
    } = req.body;
    const query = `CALL PROC_INS_CAT_EPG_CHANNEL(?,?,?);`;
    mysqlconnection.query(query, [COD_EPG, COD_SERVER, NAME_CHANNEL], (err, rows, fields) => {
        if (!err) {
            //retornar el registro insertado
            res.status(200).json(req.body);
        } else {
            console.log(req.body);
        }
    });
};

// UPDATE CATALOG OF EPG CHANNEL
export const updateCatepgchannelById = (req, res) => {
    const {
        COD_EPG,
        COD_SERVER,
        NAME_CHANNEL
    } = req.body;
    const {
        COD
    } = req.params;
    mysqlconnection.query("CALL PROC_UPD_CAT_EPG_CHANNEL(?,?,?,?)",
        [COD_EPG, COD_SERVER, NAME_CHANNEL, COD], (err, rows, fields) => {
            if (!err) {
                //retornar el registro insertado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }
        });
};

// DELETE CATALOG OF EPG CHANNEL
export const deleteCatepgchannelById = (req, res) => {
    const {
        COD
    } = req.params;
    mysqlconnection.query('CALL PROC_DEL_CAT_EPG_CHANNEL(?)', [COD],
        (err, rows, fields) => {
            if (!err) {
                res.json({
                    Status: "CATALOG OF EPG CHANNEL DELETED"
                });
            } else {
                console.log(err);
            }
        });
};