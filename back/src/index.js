import app from "./app";
require("dotenv").config();
//const { startCronJobSemanal } = require("./cronServiceReportSemanal");
const { startCronJobDiario } = require("./cronServiceReportDiario");

// Configurar tiempo de espera para las solicitudes (en milisegundos)
const timeoutInMs = 0; // Deshabilitar el tiempo de espera (0) o establecer un valor específico en milisegundos
app.timeout = timeoutInMs;

let port = process.env.PORT;
app.listen(port);

console.log(`Server is running on http://localhost:${port}`);

//startCronJobSemanal();
startCronJobDiario();