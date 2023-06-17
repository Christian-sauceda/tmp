const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const fs = require("fs");
require("dotenv").config();
const mysqlconnection = require("../src/database");
var cron = require("node-cron");

const startCronJobDiario = () => {
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

    mysqlconnection.query(`
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
          SELECT COUNT(DISTINCT c.COD_CONTENT) AS total_contents, COUNT(DISTINCT cs.COD_CHAPTERS_SERIES) AS total_chapters FROM MT_CONTENTS c INNER JOIN MT_CHAPTERS_SERIES cs ON c.COD_CONTENT = cs.COD_CONTENT WHERE c.COD_CAT_TYPE_CONTENT = ${process.env.ID_SERIESEN} AND cs.DATE_ADD >= NOW() - INTERVAL 24 HOUR;`,
      [1, 2], (err, result) => {
        if (!err) {
          // Extract the necessary data from the result
          const data = extractDataFromResult(result);

          // Create a temporary HTML file
          const htmlFilename = `report_${Date.now()}.html`;
          fs.writeFileSync(htmlFilename, data);

          // Create options for html-pdf
          const pdfOptions = { format: "Letter" };

          // Generate PDF from HTML
          pdf.create(fs.readFileSync(htmlFilename, "utf8"), pdfOptions).toFile("report.pdf", (err, res) => {
            if (err) throw err;

            // Read the saved PDF file
            const file = fs.readFileSync("report.pdf");

            // Attach the PDF to the email
            const info = transporter.sendMail({
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

            // Delete the temporary files
            fs.unlinkSync(htmlFilename);
            fs.unlinkSync("report.pdf");
          });
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

function extractDataFromResult(result) {
  // Extract the necessary data from the result and return the HTML content
  // Modify this function according to your data structure and HTML formatting
  var moviees = JSON.stringify(result[0]);
  var movieen = JSON.stringify(result[1]);
  var moviead = JSON.stringify(result[2]);
  var seriees = JSON.stringify(result[3]);
  var serisen = JSON.stringify(result[4]);
  var sport = JSON.stringify(result[5]);
  var sumes = JSON.stringify(result[6]);
  var sumen = JSON.stringify(result[7]);
  var sumad = JSON.stringify(result[8]);
  var sumsport = JSON.stringify(result[9]);
  var sumseries = JSON.stringify(result[10]);
  var sumserien = JSON.stringify(result[11]);

  let dateantes = new Date();
  dateantes.setDate(dateantes.getDate() - 5);

  let dia = String(dateantes.getDate()).padStart(2, '0');
  let mes = String(dateantes.getMonth() + 1).padStart(2, '0');
  let año = dateantes.getFullYear();

  let santes = dia + '/' + mes + '/' + año;


  let datedespues = new Date();
  let sactual = String(datedespues.getDate()).padStart(2, '0') + '/' + String(datedespues.getMonth() + 1).padStart(2, '0') + '/' + datedespues.getFullYear();
  let anio = datedespues.getFullYear();

  //enviar email
  const listapeliculases = JSON.parse(moviees);
  const listapeliculasen = JSON.parse(movieen);
  const listapeliculasad = JSON.parse(moviead);
  const listaserieses = JSON.parse(seriees);
  const listaseriesen = JSON.parse(serisen);
  const listasport = JSON.parse(sport);
  const sumapelises = JSON.parse(sumes);
  const sumapelisen = JSON.parse(sumen);
  const sumapelisad = JSON.parse(sumad);
  const sumsports = JSON.parse(sumsport);
  const sumaserieses = JSON.parse(sumseries);
  const sumaseriesen = JSON.parse(sumserien);

  // ...

  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reporte Semanal</title>
      <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        color: #333;
        padding: 50px;
        margin: 0;
        margin-top: 30px;
      }
      
      .section {
        page-break-before: avoid;
      }
      
      h1 {
        font-size: 36px;
        color: #333;
        margin: 0;
        text-align: center;
      }
    
      h2 {
        font-size: 24px;
        color: #666;
        margin: 10px 0;
        text-align: center;
      }
    
      h3 {
        font-size: 18px;
        color: #333;
        margin: 10px 0;
      }
    
      ul, ol{
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    
      li {
        margin-bottom: 5px;
      }
    
      p {
        margin: 0;
      }
    
      .total {
        font-weight: bold;
        color: #333;
      }
    
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
      span {
      	color: #0C88E3;
      }
    </style>
    
    <body>
      <h1 lang="ES-US">TOPMEDIA+</h1>
      <hr>
    
      <h2>Reporte Semanal de Contenido Subido del ${santes} al ${sactual}</h2>
      <br><br><br>
      ${listapeliculases.length > 0 ? `
      <div class="section">
      <h3>Películas en Español</h3>
      <ol>
        ${listapeliculases.map((peliculaes) => `<li>${peliculaes.title} <span>(${peliculaes.upload_date})</span></li>`).join("")}
      </ol>
      ${sumapelises.map((totales) => `<p class="total">Total: ${totales.total} Películas Español</p>`).join("")}
      </div>
      <br><hr><br>
      ` : ''}
      ${listapeliculasen.length > 0 ? `
      <div class="section">
      <h3>Películas en Inglés</h3>
      <ol>
        ${listapeliculasen.map((peliculaen) => `<li>${peliculaen.title} <span>(${peliculaen.upload_date})</span></li>`).join("")}
      </ol>
      ${sumapelisen.map((totalen) => `<p class="total">Total: ${totalen.total} Películas inglés</p>`).join("")}
      </div>
      <br><hr><br>
      ` : ''}
      ${listapeliculasad.length > 0 ? `
      <div class="section">
      <h3>Películas para Adultos</h3>
      <ol>
        ${listapeliculasad.map((peliculaad) => `<li>${peliculaad.title} <span>(${peliculaad.upload_date})</span></li>`).join("")}
      </ol>
      ${sumapelisad.map((totalad) => `<p class="total">Total: ${totalad.total} Películas Para Adulto</p>`).join("")}
      </div>
      <br><hr><br>
      ` : ''}
      ${listaseriesen.length > 0 ? `
      <div class="section">
      <h3>Series en Inglés</h3>
      <ol>
        ${listaseriesen.map((seriesen) => `<li>${seriesen.title} <span>(${seriesen.total} Capítulos)</span></li>`).join("")}
      </ol>
      ${sumaseriesen.map((totalseren) => `<p class="total">Total TvShows: ${totalseren.total_contents} Total Capítulos: ${totalseren.total_chapters}</p>`).join("")}
      </div>
      <br><hr><br>
      ` : ''}
      ${listaserieses.length > 0 ? `
      <div class="section">
      <h3>Series en Español</h3>
      <ol>
        ${listaserieses.map((serieses) => `<li>${serieses.title} <span>(${serieses.total} Capítulos)</span></li>`).join("")}
      </ol>
      ${sumaserieses.map((totalseres) => `<p class="total">Total Series: ${totalseres.total_contents} Totasl Capítulos: ${totalseres.total_chapters}</p>`).join("")}
      </div>
      <br><hr><br>
      ` : ''}
      ${listasport.length > 0 ? `
      <div class="section">
      <h3>Eventos Deportivos</h3>
      <ol>
        ${listasport.map((eventosdep) => `<li>${eventosdep.title}</li>`).join("")}
      </ol>
      ${sumsports.map((totalsports) => `<p class="total">Total: ${totalsports.total} Eventos Deportivos</p>`).join("")}
      </div>
      <br><br><br>
      ` : ''}
      <div class="footer section">
        <p>© ${anio} TopMedia. All rights reserved.</p>
      </div>
    </body>    
    </html>
    `;

  return htmlContent;
}
module.exports = startCronJobDiario;
