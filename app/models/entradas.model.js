const sql = require("./db.js");

const Entrada = function(entrada){
    this.userId = entrada.userId
    this.eventoId = entrada.eventoId
    this.numeroEntradas = entrada.numeroEntradas
    this.email = entrada.email
}

Entrada.create = (newEntrada, result)=>{
    sql.query("INSERT INTO entradas SET ?", [newEntrada], (err,res)=>{
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
          }
          console.log("created Entrada: ", { ...newEntrada });
          result(null, {...newEntrada });
    })
}

Entrada.getAllByUser = (id, result)=>{
    sql.query(`SELECT * FROM entradas WHERE userId = '${id}'`,(err,res)=>{
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("found entradas: ", res);
            result(null, res);
            return;
          }
          result({ kind: "not_found" }, null);
    })
}

Entrada.getEntrada = (id,eventoId, result)=>{
  sql.query(`SELECT * FROM entradas WHERE userId = '${id}' AND eventoId = '${eventoId}'`,(err,res)=>{
      if (err) {
          console.log("error", err);
          result(null, false);
          return;
        }
        if (res.length) {
          console.log("found entradas: ", res);
          result(null, res[0]);
          return;
        }
        result(null, false);
  })
}


Entrada.updateEntrada = (userId, eventoId, numeroEntradas, result)=>{
    sql.query(`UPDATE entradas SET numeroEntradas = ? WHERE userId = ? AND eventoId = ?`,
    [numeroEntradas, userId, eventoId], (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("updated entrada: ", eventoId);
          result(null, eventoId);
    })
} 

Entrada.remove = (userId,eventoId, result) => {
    sql.query(`DELETE FROM entradas WHERE userId = ? AND eventoId = ?`,[userId, eventoId],(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("deleted entrada: ", userId+"_"+eventoId);
          result(null, res);
    })
}

module.exports = Entrada;