const res = require("express/lib/response");
const Evento = require("../models/eventos.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const evento = req.body.evento;
  console.log(evento);
  Evento.create(evento, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Evento.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Evento.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Evento.updateById(req.params.id, new Evento(req.body), (err, data) => {
    console.log(req.body);
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Event with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Evento.remove(req.params.id,(err, data)=>{
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Event with id " + req.params.id,
        });
      }
    } else res.send({message: `Evento borrado correctamente`});
  })
}

exports.compra = (req, res) => {
  Evento.compraEntrada(req.params.id,req.query.numeroEntradas,(err,data)=>{
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Event with id " + req.params.id,
        });
      }
    } else res.send(data);
  })
}