const { Router } = require("express");
const router = Router();

// router.get('/', (req, res) =>{
//     res.json({"Title": "Hola"});
// });


router.get('/test', (req, res) =>{
    const data ={
        "name": "fazt",
        "web" : "hola.com"
    }
    
    
    res.json(data);
});


module.exports=router;