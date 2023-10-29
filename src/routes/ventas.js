const { Router } = require("express");
const router = Router();
const db = require('../index'); 


router.get('/detailsventa/departamento', (req, res) => {
    db.query('SELECT id_departamento, dsc_departamento FROM tb_departamento', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener los tipos de documento');
      } else {
        res.status(200).send(result);
      }
    });
});

router.get('/detailsventa/provincia/:id_departamento', (req, res) => {
    const id_departamento = req.params.id_departamento;
    db.query('SELECT id_provincia,dsc_provincia FROM tb_provincia WHERE id_departamento = ?', [id_departamento], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener las provincias');
      } else {
        res.status(200).send(result);
      }
    });
  });
  
  router.get('/detailsventa/distritos/:id_provincia', (req, res) => {
    const id_provincia = req.params.id_provincia;
    db.query('SELECT id_distrito,dsc_distrito FROM tb_distrito WHERE id_provincia = ?', [id_provincia], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener las provincias');
      } else {
        res.status(200).send(result);
      }
    });
  });

router.get('/ventas/productos', (req, res) => {
  db.query('SELECT id_producto,dsc_producto,precio FROM tb_producto', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener los productos');
    } else {
      const rows = result || [];
      const data = rows.map(row => ({
        id_producto: row.id_producto,
        dsc_producto: row.dsc_producto,
        precio: row.precio,
      }));
      res.status(200).send(data);
    }
  });
});

router.get('/ventas/diseno', (req, res) => {
  db.query('SELECT id_diseño,dsc_diseño,url FROM tb_diseño;', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener los productos');
    } else {
      const rows = result || [];
      const data = rows.map(row => ({
        id_diseño: row.id_diseño,
        dsc_diseño: row.dsc_diseño,
        url: row.url,
      }));
      res.status(200).send(data);
    }
  });
});
router.get('/ventas/tipografia', (req, res) => {
  db.query('SELECT id_tipografia,dsc_tipografia FROM tb_tipografia', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener tipografia');
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/reporte/eficaciaventas', (req, res) => {
  db.query('SELECT * FROM tb_nino;', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener los productos');
    } else {
      const rows = result || [];
      const data = rows.map(row => ({
        dsc_mes: row.dsc_mes,
        cantidad: row.cantidad,
        
      }));
      res.status(200).send(data);
    }
  });
});
 
router.get('/reporte/retencionclientes', (req, res) => {
  db.query('SELECT * FROM tb_nina;', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener los productos');
    } else {
      const rows = result || [];
      const data = rows.map(row => ({
        dsc_mes: row.dsc_mes,
        cantidad: row.cantidad,
      }));
      res.status(200).send(data);
    }
  });
});

router.post('/registroventas', (req, res) => {
  const id_trabajador = req.body.id_trabajador;
  const fch_registro = req.body.fch_registro;
  db.query('CALL SP_registroventa(?, ?)', [id_trabajador, fch_registro], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al registrar la venta');
      } else {
        // Obtén el valor de new_id_venta desde la base de datos
        db.query('SELECT @new_id_ventas as new_id_ventas', (err, idResult) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error al obtener el ID de la venta');
          } else {
            const new_id_venta = idResult[0].new_id_venta;
            res.status(200).send('Venta registrada exitosamente. ID de venta: ' + new_id_venta);
          }
        });
      }
  });
});

router.post('/detalleventa', (req, res) => {
  const id_venta = req.body.id_venta;
  const id_trabajador = req.body.id_trabajador;
  const dsc_campo1 = req.body.dsc_campo1;
  const dsc_campo2 = req.body.dsc_campo2;
  const cod_producto = req.body.cod_producto;
  const dsc_observacion = req.body.dsc_observacion;
  const cod_diseno = req.body.cod_diseno;
  const cod_tipografia = req.body.cod_tipografia;
  const estado_detalleventa = req.body.estado_detalleventa;
  const cod_usuario_registro = req.body.cod_usuario_registro;
  const fch_registro = req.body.fch_registro;
  const cod_usuario_registro_fch_cambio = req.body.cod_usuario_registro_fch_cambio;

  db.query(
    'CALL SP_registrodetalleventa(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @new_id_detalleventa)',
    [
      id_venta,
      id_trabajador,
      dsc_campo1,
      dsc_campo2,
      cod_producto,
      dsc_observacion,
      cod_diseno,
      cod_tipografia,
      estado_detalleventa,
      cod_usuario_registro,
      fch_registro,
      cod_usuario_registro_fch_cambio
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al registrar el detalle de venta');
      } else {
        // Obtén el valor de new_id_detalleventa desde la base de datos
        db.query('SELECT @new_id_detalleventa as new_id_detalleventa', (err, idResult) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error al obtener el ID del detalle de venta');
          } else {
            const new_id_detalleventa = idResult[0].new_id_detalleventa;
            res.status(200).send('Detalle de venta registrado exitosamente. ID de detalle de venta: ' + new_id_detalleventa);
          }
        });
      }
    }
  );
});


module.exports = router;