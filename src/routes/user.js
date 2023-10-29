const { Router } = require("express");
const router = Router();
const db = require('../index');

router.post('/', (req, res) => {
    const { usuario, contrasena } = req.body;

    db.query('SELECT id_trabajador, usuario, contrasena FROM tb_usuario WHERE usuario = ?', [usuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al verificar las credenciales');
        } else if (result.length === 0) {
            res.status(401).send('Credenciales incorrectas');
        } else {
            if (contrasena === result[0].contrasena) {
                // Las credenciales son correctas, envía el id_usuario en la respuesta
                const idUsuario = result[0].id_trabajador;
                res.status(200).json({ message: 'Inicio de sesión exitoso', id_trabajador: idUsuario });
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        }
    });
});

module.exports = router;
