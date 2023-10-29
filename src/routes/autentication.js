const { Router } = require("express");
const router = Router();
const db = require('../index');

router.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  db.query('SELECT * FROM tb_usuario WHERE usuario = ? AND contraseña = ?',
    [usuario, contraseña],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error en el servidor" });
      } else {
        if (result.length > 0) {
          // Autenticación exitosa
          res.status(200).json({ message: "Autenticación exitosa" });
        } else {
          // Credenciales incorrectas
          res.status(401).json({ message: "Credenciales incorrectas" });
        }
      }
    }
  );
});

module.exports = router;
