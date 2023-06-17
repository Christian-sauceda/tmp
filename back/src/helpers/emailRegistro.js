import nodemailer from 'nodemailer';
require('dotenv').config();

const emailRegistro = async (datos) => {
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
        from: "TopMedia+ - Confirmación de registro <" + process.env.EMAIL_FROM + ">",
        to: EMAIL_USER,
        subject: "Confirmación de registro",
        text: `Comprueba tu cuenta en TM+`,
        html: `
                    <!DOCTYPE html>
                    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    <head>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width,initial-scale=1">
                      <meta name="x-apple-disable-message-reformatting">
                      <title></title>
                      <!--[if mso]>
                      <style>
                        table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
                        div, td {padding:0;}
                        div {margin:0 !important;}
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
                      <body style="margin:0; padding:0; word-spacing:normal; background-color:#bacef5;">
                        <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#bacef5;">
                        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                          <tr>
                            <td align="center" style="padding:0;">
                              <!--[if mso]>
                              <table role="presentation" align="center" style="width:1000px;">
                              <tr>
                              <td>
                              <![endif]-->
                              <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                                <tr>
                                  <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                                  <span lang="ES-US" style="font-size: 36.0pt">TOPMEDIA+</span>
                                  <p align="center" style="margin: 0in; margin-bottom: .0001pt; text-align: center"><b><span lang="es-419" style="font-size: 16.0pt; font-family: &quot;Verdana&quot;,sans-serif">________________________</span></b><span lang="ES-HN" style="font-size: 16.0pt"><!-- o ignored --></span></p>
                                  </td>
                                </tr>
                                <p style="padding:25px;text-align:center;font-size:24px;font-weight:bold;"></p>
                                <p align="center" style="text-align: center"><span lang="es-419" style="font-size: 18.0pt; padding-top: 15px; font-family: &quot;Verdana&quot;,sans-serif">Confirmación de registro.</span></p>
                                <tr>
                                  <td style="padding:30px; background-color:#ffffff;">
                                  <br/>
                                  <br/>
                                  <p>Hola: <b>${USER_NAME}</b>, Comprueba tu cuenta en TopMedia+.</p>
                                  <br/>
                                  <br/>
                                  <p>Tu cuenta esta lista, solo debes comprobarla en el siguiente enlace:
                                  <b><a href="${process.env.FRONTEND}/confirm/${tokenunico}">Comprobar cuenta</a></b></p>
                                  <br/>
                                  <br/>
                                  <b><p>Si tú no solicitaste una cuenta, puedes ignorar este mensaje</p></b>
                                  </td>
                                  <br/>
                                  <br/>
                                  <br/>
                                </tr>
                                <tr>
                                  <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                                    <p style="margin:0;">© ${anio} TopMedia. All rights reserved.</p>
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

export default emailRegistro;

