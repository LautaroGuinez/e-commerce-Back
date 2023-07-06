const nodemailer = require("nodemailer");

const emailConfig = (addressee) => {
    const transporter = nodemailer.createTransport({
      host: "http://localhost:3000/", 
      port: 587, 
      secure: false,
      auth: {
        user: "vgamer@outlook.com.ar", 
        pass: "GAMER1234", 
      },
    });
  
    const mensaje = `
      <h1>Confirmación de compra</h1>
      <p>Gracias por tu compra.</p>
      <p>¡Disfrútalo!</p>
    `;
  
    const opcionesCorreo = {
      from: "vgamer@outlook.com.ar", // Reemplaza con tu dirección de correo
      to: addressee,
      subject: "Confirmación de compra",
      html: mensaje,
    };
  
    transporter.sendMail(opcionesCorreo, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });
  };
  
  module.exports = emailConfig