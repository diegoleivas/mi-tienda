// En verificarSesion.js
module.exports = function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ mensaje: "No autorizado" }); // 🔑 usar res.json
  }
};
