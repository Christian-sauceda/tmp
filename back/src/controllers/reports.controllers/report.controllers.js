import 'regenerator-runtime/runtime';
const nodemailer = require("nodemailer");
require("dotenv").config();
const mysqlconnection = require("../../database");
const fs = require('fs');

// Función para enviar el correo con el PDF adjunto
const enviarCorreo = async (correoDestino, pdfDocumento) => {
    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        pool: true,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.PASS_EMAIL_FROM
        }
    });

    // Configurar los datos del correo
    const mailOptions = {
        from: process.env.EMAIL_FROM, // Tu dirección de correo
        to: correoDestino, // Correo de destino
        subject: 'PDF adjunto',
        text: 'Adjunto PDF generado.',
        attachments: [
            {
                filename: 'documento.pdf',
                content: pdfDocumento,
            },
        ],
    };

    // Enviar el correo
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.log('Error al enviar el correo:', error);
    }
};

// GET INFORME by ID  CONTENT
export const getInforme = async (req, res) => {
    const { ID } = req.params;
    mysqlconnection.query("CALL PROC_REPORTE_ID(?)", [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(req.params);
        }
    });
};

// GET INFORME by ID  CONTENT and DATE init and DATE end
export const getInformeDate = async (req, res) => {
    const { ID, DATE_INIT, DATE_END } = req.params;
    mysqlconnection.query("CALL PROC_REPORTE_ID_DATE(?,?,?)", [ID, DATE_INIT, DATE_END], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(req.params);
        }
    });
}

// enviar correo con informe
export const sendInforme = async (req, res) => {
    const { correoDestino} = req.body;
    const pdfDocumento = req.file.buffer;
    try {
        await enviarCorreo(correoDestino, pdfDocumento);
        res.status(200).json({ message: 'Correo enviado con éxito', pdfDocumento, correoDestino });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
};
