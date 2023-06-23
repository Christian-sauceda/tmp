const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
require("dotenv").config();
const mysqlconnection = require("../src/database");
var cron = require("node-cron");

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

const startCronJobDiario = () => {
  cron.schedule("0 45 11 * * 1-5", async () => {
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
      SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES}; 
      SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
      SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
      SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESES} AND cs.COD_CAT_TYPE_CONTENT = ${process.env.ID_CHAPTERSERIESES} GROUP BY c.TITLE;
      SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESEN} AND cs.COD_CAT_TYPE_CONTENT = ${process.env.ID_CHAPTERSERIESEN} GROUP BY c.TITLE;
      SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SPORTS} AND cs.COD_CAT_TYPE_CONTENT = ${process.env.ID_CHAPTERSPORTS} GROUP BY c.TITLE;
      SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES};
      SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
      SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
      SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORTS};
      SELECT c.TITLE AS total_contents, COUNT(cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESES} AND cs.COD_CAT_TYPE_CONTENT = ${process.env.ID_CHAPTERSERIESES};
      SELECT c.TITLE AS total_contents, COUNT(cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESEN} AND cs.COD_CAT_TYPE_CONTENT = ${process.env.ID_CHAPTERSERIESEN};
      `,[1, 2],
      async (error, result) => {
        if (error) {
          console.error("Error en la consulta MySQL:", error);
          return;
        }

        // Extraer los datos necesarios del resultado
        const data = extractDataFromResult(result);

        // Crear un archivo PDF con los datos
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream("daily_report.pdf"));

        // Agregar contenido al PDF
        pdfDoc.font("Helvetica-Bold").fontSize(18).text("Reporte Diario", { align: "center" });

        // Agregar los datos al PDF
        pdfDoc.font("Helvetica").fontSize(12).text(`Películas en Español: ${data.totalMoviesES}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Películas en Inglés: ${data.totalMoviesEN}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Películas para Adultos: ${data.totalMoviesAD}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Eventos Deportivos: ${data.totalSports}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Series en Español: ${data.totalSeriesES}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Capítulos en Series en Español: ${data.totalChaptersES}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Series en Inglés: ${data.totalSeriesEN}`);
        pdfDoc.font("Helvetica").fontSize(12).text(`Capítulos en Series en Inglés: ${data.totalChaptersEN}`);

        // Películas en Español
  if (extractedData.moviesES.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Películas (ES)", { underline: true });
    pdfDoc.moveDown();
    extractedData.moviesES.forEach((movie) => {
      pdfDoc.text(`${movie.title} - ${movie.upload_date}`);
    });
    pdfDoc.moveDown();
  }

  // Películas en Inglés
  if (extractedData.moviesEN.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Movies (EN)", { underline: true });
    pdfDoc.moveDown();
    extractedData.moviesEN.forEach((movie) => {
      pdfDoc.text(`${movie.title} - ${movie.upload_date}`);
    });
    pdfDoc.moveDown();
  }

  // Películas para Adultos
  if (extractedData.adultMovies.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Adult Movies", { underline: true });
    pdfDoc.moveDown();
    extractedData.adultMovies.forEach((movie) => {
      pdfDoc.text(`${movie.title} - ${movie.upload_date}`);
    });
    pdfDoc.moveDown();
  }

  // Eventos Deportivos
  if (extractedData.sportEvents.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Eventos Deportivos", { underline: true });
    pdfDoc.moveDown();
    extractedData.sportEvents.forEach((event) => {
      pdfDoc.text(`${event.title} - ${event.date}`);
    });
    pdfDoc.moveDown();
  }

  // Series en Español
  if (extractedData.seriesES.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Series (ES)", { underline: true });
    pdfDoc.moveDown();
    extractedData.seriesES.forEach((series) => {
      pdfDoc.text(`${series.title} - Temporadas: ${series.total_seasons}`);
    });
    pdfDoc.moveDown();
  }

  // Capítulos de Series en Español
  if (extractedData.seriesEpisodesES.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Capítulos de Series (ES)", { underline: true });
    pdfDoc.moveDown();
    extractedData.seriesEpisodesES.forEach((episode) => {
      pdfDoc.text(`${episode.title} - Temporada: ${episode.season} - Episodio: ${episode.episode}`);
    });
    pdfDoc.moveDown();
  }

  // Series en Inglés
  if (extractedData.seriesEN.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Series (EN)", { underline: true });
    pdfDoc.moveDown();
    extractedData.seriesEN.forEach((series) => {
      pdfDoc.text(`${series.title} - Seasons: ${series.total_seasons}`);
    });
    pdfDoc.moveDown();
  }

  // Episodes of Series in English
  if (extractedData.seriesEpisodesEN.length > 0) {
    pdfDoc.font("Helvetica-Bold").fontSize(14).text("Episodes of Series (EN)", { underline: true });
    pdfDoc.moveDown();
    extractedData.seriesEpisodesEN.forEach((episode) => {
      pdfDoc.text(`${episode.title} - Season: ${episode.season} - Episode: ${episode.episode}`);
    });
    pdfDoc.moveDown();
  }

        // Finalizar el PDF
        pdfDoc.end();

        // Enviar el correo electrónico con el archivo PDF adjunto
        const mailOptions = {
              from: "TopMedia+ - Reporte Diario <" + process.env.EMAIL_FROM + ">",
              to: [process.env.EMAIL_CEO, process.env.EMAIL_ADMIN].join(","),
              subject: "Reporte Diario de Contenido Subido a TopMedia+",
              text: `Reporte Diario de Contenido Subido a TopMedia+\n\n\n\nResumen:\n\nTotal Películas en Español: ${result[6][0].total}\nTotal Películas en Inglés: ${result[7][0].total}\nTotal Películas para Adultos: ${result[8][0].total}\nTotal Series en Español: ${result[10][0].total_contents} Total Capítulos: ${result[10][0].total_chapters}\nTotal Series en Inglés: ${result[11][0].total_contents} Total Capítulos: ${result[11][0].total_chapters}\nTotal Eventos Deportivos: ${result[9][0].total}\n\n\n\nEste correo ha sido generado automáticamente. Por favor, no responder a este mensaje.`,
              attachments: [
                {
                  filename: "report.pdf",
                  content: file,
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
  startCronJobDiario: startCronJobDiario
};
