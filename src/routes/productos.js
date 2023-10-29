const { Router } = require("express");
const router = Router();
const db = require('../index');

router.get('/producto', (req, res) => {
    db.query('SELECT id_tipoproducto, dsc_tipo FROM tb_tipoproducto', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener los tipos de documento');
      } else {
        res.status(200).send(result);
      }
    });
});

router.get('/producto/:tipoproducto_id', (req, res) => {
    const tipoproducto_id = req.params.tipoproducto_id;
    db.query('select * from tb_producto where id_tipoproducto= ?', [tipoproducto_id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener las provincias');
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/coleccion', (req, res) => {
    db.query('SELECT id_coleccion, dsc_coleccion FROM tb_coleccion', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener la coleccion');
      } else {
        res.status(200).send(result);
      }
    });
});

router.get('/coleccion/:coleccion_id', (req, res) => {
    const coleccion_id = req.params.coleccion_id;
    db.query('select * from tb_diseno where id_coleccion= ?', [coleccion_id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener las coleccion');
      } else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/tipografia', (req, res) => {
    db.query('SELECT id_tipografia, dsc_tipografia FROM tb_tipografia', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener la coleccion');
      } else {
        res.status(200).send(result);
      }
    });
});


module.exports=router;