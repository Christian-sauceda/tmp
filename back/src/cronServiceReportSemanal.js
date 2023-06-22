const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();
const mysqlconnection = require("../src/database");
var cron = require("node-cron");

const startCronJobSemanal = () => {
  cron.schedule("0 00 17 * * 1-5", () => {
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
        SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES}; 
        SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
        SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
        SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESES} AND cs.DATE_ADD >= NOW() - INTERVAL 6 DAY GROUP BY c.COD_CONTENT, c.TITLE;
        SELECT  c.TITLE as title, COUNT(cs.COD_CHAPTERS_SERIES) AS total FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT= ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 6 DAY GROUP BY c.COD_CONTENT, c.TITLE;
        SELECT t1.TITLE AS title, t1.YEAR AS upload_date FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORT};
        SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESES};
        SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESEN};
        SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_MOVIESAD};
        SELECT COUNT(t1.TITLE) AS total FROM MT_CONTENTS t1 WHERE upload_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 DAY) AND NOW() AND t1.COD_CAT_TYPE_CONTENT = ${process.env.ID_SPORT};
        SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESES} AND cs.DATE_ADD >= NOW() - INTERVAL 6 DAY;
        SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 6 DAY;
        `,
      [1, 2],
      async (err, result) => {
        if (!err) {
          // Extract the necessary data from the result
          const data = extractDataFromResult(result);

          // Create a temporary HTML file
          const htmlFilename = `report_${Date.now()}.html`;
          fs.writeFileSync(htmlFilename, data);

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

startCronJobSemanal();