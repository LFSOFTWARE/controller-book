const express = require("express");
const router = express.Router();
const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");


const key = "corriasddasdsad";

router.post("/auth", (req, res) => {
  var { email, password } = req.body;

  if (email != undefined) {
    Users.findOne({ where: { email: email } })
      .then((user) => {
        if (user != undefined) {
          if (user.password == password) {
            jwt.sign(
              { id: user.id },
              key,
              { expiresIn: "48h" },
              (err, token) => {
                if (err) {
                  res.status(400);
                  res.json({ erro: "falha interna" });
                } else {
                  res.status(200);
                  res.json({ token: token });
                }
              }
            );
          } else {
            res.status(401);
            res.json({ erro: "O Credenciais  invalidas" });
          }
        } else {
          res.status(404);
          res.json({ erro: "O email enviado não consta no sistema" });
        }
      })
      .catch((err) => {
        res.status(500);
      });
  } else {
    res.status(400);
    res.json({ erro: "O email enviado é invalido " });
  }
});

module.exports = router;
