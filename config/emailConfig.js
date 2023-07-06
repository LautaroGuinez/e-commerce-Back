const nodemailer = require("nodemailer");

const emailConfig = (addressee) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", 
      port: 587, 
      secure: false,
      auth: {
        user: "tu_correo@example.com", 
        pass: "tu_contraseña", 
      },
    });
  
    const mensaje = `
      <h1>Confirmación de compra</h1>
      <p>Gracias por tu compra.</p>
      <p>¡Disfrútalo!</p>
    `;
  
    const opcionesCorreo = {
      from: "tu_correo@example.com", // Reemplaza con tu dirección de correo
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