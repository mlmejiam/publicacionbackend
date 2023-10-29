const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('../index'); 

router.use(cors());

router.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  db.query('SELECT id_trabajador FROM tb_usuario WHERE usuario = ? AND contraseña = ?', [usuario, contraseña], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al verificar las credenciales');
    } else {
      if (result.length > 0) {
        const id_trabajador = result[0].id_trabajador; // Obtener el id_trabajador de la consulta
        res.status(200).send({ message: 'Inicio de sesión exitoso', id_trabajador });
      } else {
        res.status(401).send('Credenciales inválidas');
      }
    }
  });
});


  router.get('/login/:id_trabajador', (req, res) => {
    const { id_trabajador } = req.params;
  
    db.query('CALL sp_datostrabajador(?)', [id_trabajador], (err, resultSets) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener los datos del trabajador');
      } else {
        const resultSet = resultSets[0];
        const rows = resultSet || [];
        const data = rows.map(row => ({
          dsc_nombre: row.dsc_nombre
        }));
        res.status(200).send(data);
      }
    });
  });
  
  
  

  module.exports = router;