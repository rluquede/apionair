module.exports = app =>{
    const email = require("../controllers/email.controller.js");
    var router = require("express").Router();
    router.post("/",email.correoEntradas);
    router.post("/contacto",email.correoContacto);
    app.use('/email', router);
}