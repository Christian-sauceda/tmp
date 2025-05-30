import nodemailer from 'nodemailer';
require('dotenv').config();

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.PASS_EMAIL_FROM
        }
    });

    let fecha = new Date();
    let anio = fecha.getFullYear();

    const { EMAIL_USER, USER_NAME, tokenunico } = datos;
    // Enviar Email
    const info = await transporter.sendMail({
        from: "TopMedia+ - Restablecer Contraseña <" + process.env.EMAIL_FROM + ">",
        to: EMAIL_USER,
        subject: "Restablece tu contraseña",
        text: `Restablece tu contraseña en TM+`,
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Restablecimiento de Contraseña - TOPMEDIA+</title>
          <!--[if mso]>
          <style>
            table { border-collapse: collapse; border-spacing: 0; border: none; margin: 0; }
            div, td { padding: 0; }
            div { margin: 0 !important; }
          </style>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
          <style>
            body {
              margin: 0;
              padding: 0;
              word-spacing: normal;
              background-color: #bacef5;
            }
        
            table, td, div, h1, p {
              font-family: Arial, sans-serif;
            }
        
            @media screen and (max-width: 530px) {
              .unsub {
                display: block;
                padding: 8px;
                margin-top: 14px;
                border-radius: 6px;
                background-color: #555555;
                text-decoration: none !important;
                font-weight: bold;
              }
              .col-lge {
                max-width: 150% !important;
              }
            }
        
            @media screen and (min-width: 531px) {
              .col-sml {
                max-width: 27% !important;
              }
              .col-lge {
                max-width: 73% !important;
              }
            }
          </style>
        </head>
        <body>
          <div role="article" aria-roledescription="email" lang="es" style="text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
            <table role="presentation" style="width: 100%; border: none; border-spacing: 0;">
              <tr>
                <td align="center" style="padding: 0;">
                  <!--[if mso]>
                  <table role="presentation" align="center" style="width: 1000px;">
                  <tr>
                  <td>
                  <![endif]-->
                  <table role="presentation" style="padding: 0px 0px 40px 0px; width: 94%; max-width: 600px; border: none; border-spacing: 0; text-align: left; font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color: #363636; margin: 0 auto;">
                    <tr>
                      <td style="padding: 40px 0px 30px 0px; text-align: center; font-size: 24px; font-weight: bold;">
                        <span lang="es" style="font-size: 36.0pt;">TOPMEDIA+</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; background-color: #ffffff;">
                        <p style="font-size: 18px; text-align: center; font-weight: bold;">Restablecimiento de Contraseña</p>
                        <p>Hola <b>${USER_NAME}</b>,</p>
                        <p>Has solicitado restablecer tu contraseña en TopMedia+. Para generar una nueva contraseña, haz clic en el siguiente enlace:</p>
                        <p style="text-align: center;"><b><a href="${process.env.FRONTEND}/olvidepassword/${tokenunico}" style="color: #0000EE; text-decoration: underline;">Restablecer Contraseña</a></b></p>
                        <p>Si no has solicitado restablecer la contraseña, puedes ignorar este mensaje.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px; text-align: center; font-size: 12px; background-color: #404040; color: #cccccc;">
                        <p style="margin: 0;">© ${anio} TopMedia. Todos los derechos reservados.</p>
                      </td>
                    </tr>
                  </table>
                  <!--[if mso]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
        `,
    });
    console.log("Message sent: %s", info.messageId);
}

export default emailOlvidePassword;

