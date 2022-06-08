const sql = require("./db.js");

const Evento = function (evento) {
  this.titulo = evento.titulo;
  this.lugar = evento.lugar;
  this.fechaInicio = evento.fechaInicio;
  this.fechaFin = evento.fechaFin;
  this.stock = evento.stock;
  this.precio = evento.precio;
  this.imgUrl = evento.imgUrl;
};

Evento.create = (newEvento, result) => {
  sql.query("INSERT INTO eventos SET ?", [newEvento], (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("created Evento: ", { id: res.insertId, ...newEvento });
    result(null, { id: res.insertId, ...newEvento });
  });
};

Evento.getAll = (result) => {
  let query = "SELECT * FROM eventos ORDER BY fechaInicio DESC";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    console.log("eventos: ", res);
    result(null, res);
  });
};

Evento.findById = (id, result) => {
  sql.query(`SELECT * FROM eventos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Evento.updateById = (id, evento, result) => {
  sql.query(
    "UPDATE eventos SET titulo = ?, lugar = ?, fechaInicio = ?,fechaFin = ?, stock = ?, precio = ?, imgUrl = ? WHERE id = ?",
    [
      evento.titulo,
      evento.lugar,
      evento.fechaInicio,
      evento.fechaFin,
      evento.stock,
      evento.precio,
      evento.imgUrl,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated evento: ", { id: id, ...evento });
      result(null, { id: id, ...evento });
    }
  );
};

Evento.compraEntrada = (id, numeroEntradas, result) => {
  sql.query(
    "UPDATE eventos SET stock = ? WHERE id = ?",
    [numeroEntradas, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated evento: ", id);
      result(null, res);
    }
  );
};

Evento.remove = (id, result) => {
  sql.query("DELETE FROM eventos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted evento: ", id);
    result(null, res);
  });
};

module.exports = Evento;
