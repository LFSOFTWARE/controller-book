const jwt = require("jsonwebtoken");
const key = "corriasddasdsad";

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    jwt.verify(token, key, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ erro: "token invalido" });
      }else{
          req.logger = {id:data.id}
            next();
      }
    });
  } else {
    res.status(401);
    res.json({ erro: "token invalido" });
  }

}

module.exports = auth;
