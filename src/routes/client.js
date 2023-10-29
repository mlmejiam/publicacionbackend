const { Router } = require("express");
const router = Router();
const db = require('../index'); 

router.post('/create', (req, res)=>{
   const namen = req.body.namen
    const lastnamen = req.body.lastnamen
    const lastnamemn = req.body.lastnamemn

    db.query(
        'INSERT INTO tb_detallecliente (id_detallecliente,nombre,apellido_paterno,apellido_materno,id_cliente) VALUES (?,?,?,?,?)',
        [19, namen, lastnamen, lastnamemn, 1],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al agregar el detalle del cliente"); // enviar una respuesta de error al cliente
            } else {
                res.status(200).send("Detalle del cliente agregado con éxito!"); // enviar una respuesta de éxito al cliente
            }
        }
    );
});

router.get('/details', (req, res) => {
    db.query('SELECT nombre as namen, apellido_paterno as lastnamen, apellido_materno as lastnamenmn FROM tb_detallecliente',
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

router.delete('/:id_detallecliente', (req, res)=>{
    const id_detallecliente = req.params.id;

  db.query(
        'DELETE FROM tb_detallecliente WHERE id_detallecliente = ?',
        [id_detallecliente],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al eliminar el detalle del cliente"); // enviar una respuesta de error al cliente
            } else {
                res.status(200).send(`Detalle del cliente con ID ${id_detallecliente} eliminado con éxito!`); // enviar una respuesta de éxito al cliente
            }
        }
    );
});

router.get('/details/typedocument', (req, res) => {
    db.query('SELECT id_tipodocumento, dsc_tipodocumento FROM tb_tipodocumento', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al obtener los tipos de documento');
      } else {
        res.status(200).send(result);
      }
    });
});
  
router.get('/', (req, res) => {
  db.query('CALL sp_listarCliente()', (err, resultSets) => {
      if (err) {
          console.log(err);
          res.status(500).send('Error al obtener los tipos de documento');
      } else {
          const resultSet = resultSets[0];
          const rows = resultSet || [];
          const data = rows.map(row => ({
              id_cliente: row.id_cliente,
              CODIGO_CLIENTE: row.CODIGO_CLIENTE,
              nombres_completos: row.nombres_completos,
              flg_activo: row.flg_activo,
              seguimiento:row.seguimiento, 
              numerocelular:row.numerocelular 
          }));
          res.status(200).send(data);
      }
  });
});

router.delete('/eliminarcliente/:id_cliente', (req, res)=>{
  const id_cliente = req.params.id_cliente;

  db.query(
      'DELETE FROM tb_cliente WHERE id_cliente = ?',
      [id_cliente],
      (err, result) => {
          if (err) {
              console.log(err);
              res.status(500).send("Error al eliminar el cliente");
          } else {
              res.status(200).send(`Cliente con ID ${id_cliente} eliminado con éxito!`);
          }
      }
  );
});

// router.get('/listadotrabajador/:trabajador_id', (req, res) => {
//   const trabajador_id = req.params.trabajador_id;
//   db.query('CALL SP_MostrarTrabajador(?)', [trabajador_id], (err, resultSets) => {
//     if (err) {
//         console.log(err);
//         res.status(500).send('Error al obtener el trabajador');
//     } else {
//         console.log(resultSets); // Agregar esta línea para depurar los resultados
//         const resultSet = resultSets[0];
//         const rows = resultSet || [];
//         const data = rows.map(row => ({
//             trabajador_id: row.trabajador_id,
//             dsc_nombre: row.dsc_nombre,  
//         }));
//         res.status(200).send(data);
//     }
// });
// });

router.get('/listadotrabajador/:trabajador_id', (req, res) => {
  const trabajador_id = req.params.trabajador_id;
  db.query('select * from tb_trabajador where id_trabajador= ?', [trabajador_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener las provincias');
    } else {
      res.status(200).send(result);
    }
  });
});



  module.exports = router;