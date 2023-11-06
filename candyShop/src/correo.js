const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail', // O utiliza tus propios datos de servidor de correo
  auth: {
    user: 'katherinechavezolaya@gmail.com', // Tu dirección de correo
    pass: 'Melanieteamo12', // Tu contraseña
  },
});

app.post('/enviar-correo', (req, res) => {
  const { nombre, apellido, email, telefono, message } = req.body;

  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'destinatario@example.com', // Dirección de correo del destinatario
    subject: 'Mensaje de contacto',
    html: `
      <p>Nombre: ${nombre}</p>
      <p>Apellido: ${apellido}</p>
      <p>Email: ${email}</p>
      <p>Teléfono: ${telefono}</p>
      <p>Mensaje: ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
