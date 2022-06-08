const res = require("express/lib/response");
const Entrada = require("../models/entradas.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const entrada = req.body.entrada;
  Entrada.create(entrada, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the entrada.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByUser = (req, res) => {
  Entrada.getAllByUser(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Entrada.getEntrada(req.query.userId, req.query.eventoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          data,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.eventoId,
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
  Entrada.updateEntrada(
    req.query.userId,
    req.query.eventoId,
    req.query.numeroEntradas,
    (err, data) => {
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
    }
  );
};

exports.delete = (req, res) => {
  Entrada.remove(req.query.userId, req.params.id, (err, data) => {
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
    } else res.send({ message: `Entrada borrado correctamente` });
  });
};
