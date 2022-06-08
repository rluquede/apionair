module.exports = app =>{
    const entradas = require("../controllers/entrada.controller.js");
    var router = require("express").Router();
    router.get("/:userId", entradas.findByUser);
    router.get("/",entradas.findOne);
    router.post("/", entradas.create);
    router.put("/", entradas.update);
    router.delete("/:id", entradas.delete)
    app.use('/entradas', router);
}