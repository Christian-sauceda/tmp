const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();
const mysqlconnection = require("../src/database");
var cron = require("node-cron");

// Function to extract necessary data from the result
function extractDataFromResult(result) {
  const data = {
    //agregar diseño
    


    moviesES: result[0], // Result of the first SQL query for movies in Spanish
    moviesEN: result[1], // Result of the second SQL query for movies in English
    moviesAD: result[2], // Result of the third SQL query for adult movies
    seriesES: result[3], // Result of the fourth SQL query for series in Spanish
    seriesEN: result[4], // Result of the fifth SQL query for series in English
    sports: result[5], // Result of the sixth SQL query for sports events
    totalMoviesES: result[6][0].total, // Total count of movies in Spanish
    totalMoviesEN: result[7][0].total, // Total count of movies in English
    totalMoviesAD: result[8][0].total, // Total count of adult movies
    totalSports: result[9][0].total, // Total count of sports events
    totalSeriesES: result[10][0].total_contents, // Total count of series in Spanish
    totalChaptersES: result[10][0].total_chapters, // Total count of chapters in Spanish series
    totalSeriesEN: result[11][0].total_contents, // Total count of series in English
    totalChaptersEN: result[11][0].total_chapters, // Total count of chapters in English series
  };

  return data;
}

const startCronJobDiario = () => {
  cron.schedule("0 45 10 * * 1-5", () => {
    // ENVIA EMAIAUTOMATICO
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
          SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESES} AND cs.DATE_ADD >= NOW() - INTERVAL 24 HOUR GROUP BY c.COD_CONTENT, c.TITLE;
          SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 24 HOUR GROUP BY c.COD_CONTENT, c.TITLE;
          SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORT};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
          SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORT};
          SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESES} AND cs.DATE_ADD >= NOW() - INTERVAL 24 HOUR;
          SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 24 HOUR;
          `,
      [1, 2],
      async (err, result) => {
        if (!err) {
          // Extract the necessary data from the result
          const data = extractDataFromResult(result);

          // Create a temporary HTML file
          const htmlFilename = `report_${Date.now()}.html`;
          fs.writeFileSync(htmlFilename, JSON.stringify(data));

          try {
            // Launch Puppeteer and create a new page
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Set the content of the page to the generated HTML
            const htmlContent = fs.readFileSync(htmlFilename, "utf8");
            await page.setContent(htmlContent);

            // Generate PDF from HTML using Puppeteer
            await page.pdf({ path: "report.pdf", format: "Letter" });

            // Read the saved PDF file
            const file = fs.readFileSync("report.pdf");

            // Attach the PDF to the email
            const info = await transporter.sendMail({
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
            });

            // Close the Puppeteer browser
            await browser.close();

            // Delete the temporary files
            fs.unlinkSync(htmlFilename);
            fs.unlinkSync("report.pdf");
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(err);
        }
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
