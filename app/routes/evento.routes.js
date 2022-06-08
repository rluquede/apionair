module.exports = app =>{
    const eventos = require("../controllers/evento.controller.js");
    var router = require("express").Router();
    router.get("/", eventos.findAll);
    router.get("/:id", eventos.findOne);
    router.post("/", eventos.create);
    router.put("/:id", eventos.update);
    router.delete("/:id", eventos.delete)
    router.put("/compra/:id", eventos.compra);
    app.use('/eventos', router);
}