const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
require("dotenv").config();
const mysqlconnection = require("../src/database");
var cron = require("node-cron");

var fechahoy = new Date().toISOString().slice(0, 10);
var fechaantes = new Date();
fechaantes.setDate(fechaantes.getDate() - 7);
fechaantes = fechaantes.toISOString().slice(0, 10);

// Función para extraer los datos necesarios del resultado
function extractDataFromResult(result) {
  const data = {
    moviesES: result[0], // Resultado de la primera consulta SQL para películas en español
    moviesEN: result[1], // Resultado de la segunda consulta SQL para películas en inglés
    moviesAD: result[2], // Resultado de la tercera consulta SQL para películas para adultos
    seriesES: result[3], // Resultado de la cuarta consulta SQL para series en español
    seriesEN: result[4], // Resultado de la quinta consulta SQL para series en inglés
    sports: result[5], // Resultado de la sexta consulta SQL para eventos deportivos
    totalMoviesES: result[6][0].total, // Total de películas en español
    totalMoviesEN: result[7][0].total, // Total de películas en inglés
    totalMoviesAD: result[8][0].total, // Total de películas para adultos
    totalSports: result[9][0].total, // Total de eventos deportivos
    totalSeriesES: result[10][0].total_contents, // Total de series en español
    totalChaptersES: result[10][0].total_chapters, // Total de capítulos en series en español
    totalSeriesEN: result[11][0].total_contents, // Total de series en inglés
    totalChaptersEN: result[11][0].total_chapters, // Total de capítulos en series en inglés
  };
  return data;
}

const startCronJobSemanal = () => {
  cron.schedule("0 30 9 * * 1", async () => {
    // Configurar el transportador de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      pool: true,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASS_EMAIL_FROM,
      },
    });

    mysqlconnection.query(
      `
          SELECT t1.TITLE_LATIN AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES}; 
          SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
          SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
          SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESES} AND cs.DATE_ADD >= NOW() - INTERVAL 7 DAY GROUP BY c.COD_CONTENT, c.TITLE;
          SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 7 DAY GROUP BY c.COD_CONTENT, c.TITLE;
          SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORT};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORT};
          SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESES} AND cs.DATE_ADD >= NOW() - INTERVAL 7 DAY;
          SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 7 DAY;
          `, [1, 2],
      async (error, result) => {
        if (error) {
          console.error("Error en la consulta MySQL:", error);
          return;
        }

        // Extraer los datos necesarios del resultado
        const data = extractDataFromResult(result);

        // Crear un archivo PDF con los datos
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream("ReporteSemanal.pdf"));

        // Agregar contenido al PDF
        pdfDoc.font("Helvetica-Bold").fontSize(30).text("TOPMEDIA+", { align: "center", color: "#333" });
        pdfDoc.font("Helvetica").fontSize(12).text(`Reporte Semanal de Contenido Subido del ${fechaantes} al ${fechahoy}`, { align: "center", });
        pdfDoc.moveTo(50, pdfDoc.y)
          .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
          .stroke();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.font("Helvetica-Bold").fontSize(14).text("Resumen:", { underline: true, align: "center" });
        pdfDoc.moveDown();
        // Agregar los datos al PDF
        pdfDoc.font("Helvetica").fontSize(12).text(`Películas en Español: ${data.totalMoviesES}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Películas en Inglés: ${data.totalMoviesEN}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Películas para Adultos: ${data.totalMoviesAD}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Eventos Deportivos: ${data.totalSports}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Series en Español: ${data.totalSeriesES}, Capítulos: ${data.totalChaptersES}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Series en Inglés: ${data.totalSeriesEN}, Capítulos: ${data.totalChaptersEN}`);
        pdfDoc.moveDown();
        pdfDoc.moveTo(50, pdfDoc.y)
          .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
          .stroke();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        // Películas en Español
        if (data.moviesES.length > 0) {
          pdfDoc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("Películas en Español", { underline: true, align: "center" });
          pdfDoc.moveDown();
          data.moviesES.forEach((movie) => {
            pdfDoc.fillColor("black") // Establecer el color de relleno en rojo
              .font("Helvetica") // Establecer la fuente en Helvetica
              .text(`• ${movie.title}`, { continued: true }) // Dibujar el título de la película
              .fillColor("teal") // Restaurar el color de relleno predeterminado a negro
              .text(` (${movie.upload_date})`); // Dibujar la fecha de carga en rojo
          });
          pdfDoc.font("Helvetica-Bold").fontSize(13).text(`Total Películas en Español: ${data.totalMoviesES}`, { color: "red" });
          pdfDoc.moveDown();
          pdfDoc.moveTo(50, pdfDoc.y)
            .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
            .stroke();
          pdfDoc.moveDown();
        }

        // Películas en Inglés
        if (data.moviesEN.length > 0) {
          pdfDoc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("Películas en Inglés", { underline: true, align: "center" });
          pdfDoc.moveDown();
          data.moviesEN.forEach((movie) => {
            pdfDoc.fillColor("black") // Establecer el color de relleno en rojo
              .font("Helvetica") // Establecer la fuente en Helvetica
              .text(`• ${movie.title}`, { continued: true }) // Dibujar el título de la película
              .fillColor("teal") // Restaurar el color de relleno predeterminado a negro
              .text(` (${movie.upload_date})`); // Dibujar la fecha de carga en rojo
          });
          pdfDoc.font("Helvetica-Bold").fontSize(13).text(`Total Películas en Inglés: ${data.totalMoviesEN}`, { color: "red" });
          pdfDoc.moveDown();
          pdfDoc.moveTo(50, pdfDoc.y)
            .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
            .stroke();
          pdfDoc.moveDown();
        }

        // Películas para Adultos
        if (data.moviesAD.length > 0) {
          pdfDoc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("Películas para Adultos", { underline: true, align: "center" });
          pdfDoc.moveDown();
          data.moviesAD.forEach((movie) => {
            pdfDoc.fillColor("black") // Establecer el color de relleno en rojo
              .font("Helvetica") // Establecer la fuente en Helvetica
              .text(`• ${movie.title}`, { continued: true }) // Dibujar el título de la película
              .fillColor("teal") // Restaurar el color de relleno predeterminado a negro
              .text(` (${movie.upload_date})`); // Dibujar la fecha de carga en rojo
          });
          pdfDoc.font("Helvetica-Bold").fontSize(13).text(`Total Películas para Adultos: ${data.totalMoviesAD}`, { color: "red" });
          pdfDoc.moveDown();
          pdfDoc.moveTo(50, pdfDoc.y)
            .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
            .stroke();
          pdfDoc.moveDown();
        }

        // Eventos Deportivos
        if (data.sports.length > 0) {
          pdfDoc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("Eventos Deportivos", { underline: true, align: "center" });
          pdfDoc.moveDown();
          data.sports.forEach((event) => {
            pdfDoc.fillColor("black") // Establecer el color de relleno en rojo
              .font("Helvetica") // Establecer la fuente en Helvetica
              .text(`• ${event.title}`, { continued: true }) // Dibujar el título de la película
          });
          pdfDoc.font("Helvetica-Bold").fontSize(13).text(`Total Eventos Deportivos: ${data.totalSports}`, { color: "red" });
          pdfDoc.moveDown();
          pdfDoc.moveTo(50, pdfDoc.y)
            .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
            .stroke();
          pdfDoc.moveDown();
        }

        // Series en Español
        if (data.seriesES.length > 0) {
          pdfDoc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("Series en Español", { underline: true, align: "center" });
          pdfDoc.moveDown();
          data.seriesES.forEach((series) => {
            pdfDoc.fillColor("black") // Establecer el color de relleno en negro
            .font("Helvetica") // Establecer la fuente en Helvetica
            .text(`• ${series.title}`, { continued: true })
            .fillColor("teal") // Restaurar el color de relleno predeterminado a negro
            .text(` (${series.total} Capítulos)`)
          });
          pdfDoc.font("Helvetica-Bold").fontSize(13).text(`Total Series en Español: ${data.totalSeriesES}, Capítulos: ${data.totalChaptersES}`);
          pdfDoc.moveDown();
          pdfDoc.moveTo(50, pdfDoc.y)
            .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
            .stroke();
          pdfDoc.moveDown();
        }

        // Series en Inglés
        if (data.seriesEN.length > 0) {
          pdfDoc.fillColor("black").font("Helvetica-Bold").fontSize(14).text("Series en Inglés", { underline: true, align: "center" });
          pdfDoc.moveDown();
          data.seriesEN.forEach((series) => {
            pdfDoc.fillColor("black") // Establecer el color de relleno en negro
            .font("Helvetica") // Establecer la fuente en Helvetica
            .text(`• ${series.title}`, {continued: true})
            .fillColor("teal") // Restaurar el color de relleno predeterminado a negro
            .text(` (${series.total} Capítulos)`)
          });
          pdfDoc.font("Helvetica-Bold").fontSize(13).text(`Total Series en Inglés: ${data.totalSeriesEN}, Capítulos: ${data.totalChaptersEN}`);
          pdfDoc.moveDown();
          pdfDoc.moveTo(50, pdfDoc.y)
            .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
            .stroke();
          pdfDoc.moveDown();
        }

        // Finalizar el PDF
        pdfDoc.end();

        // Enviar el correo electrónico con el archivo PDF adjunto
        const mailOptions = {
          from: "TopMedia+ <" + process.env.EMAIL_FROM + ">",
          to: [process.env.EMAIL_CEO, process.env.EMAIL_ADMIN].join(","),
          subject:`Reporte Semanal de Contenido Subido a TopMedia+ del ${fechaantes} - ${fechahoy}`,
          text: `Reporte Semanal de Contenido Subido a TopMedia+ del ${fechaantes} - ${fechahoy}\n\n\n\nResumen:\n\nTotal Películas en Español: ${result[6][0].total}\nTotal Películas en Inglés: ${result[7][0].total}\nTotal Películas para Adultos: ${result[8][0].total}\nTotal Series en Español: ${result[10][0].total_contents} Total Capítulos: ${result[10][0].total_chapters}\nTotal Series en Inglés: ${result[11][0].total_contents} Total Capítulos: ${result[11][0].total_chapters}\nTotal Eventos Deportivos: ${result[9][0].total}\n\n\n\nEste correo ha sido generado automáticamente. Por favor, no responder a este mensaje.`,
          attachments: [
            {
              filename: "ReporteSemanal.pdf",
              content: fs.createReadStream("ReporteSemanal.pdf"),
            },
          ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error al enviar el correo electrónico:", error);
          } else {
            console.log("Correo electrónico enviado:", info.response);
          }
        });
      }
    );
  }, {
    scheduled: true,
    timezone: "America/Tegucigalpa",
  });
};

module.exports = {
  startCronJobSemanal: startCronJobSemanal
};