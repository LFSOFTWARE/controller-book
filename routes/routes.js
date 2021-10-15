const express = require("express");
const router = express.Router();
const Mybooks = require("../models/myBooks.js");
const wishBooks = require("../models/wishBooks.js");
const auth = require("../middle/auth.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Opreration with my books

//Pega todos os livros da sua biblioteca
router.get("/mylivros", (req, res) => {
  Mybooks.findAll()
    .then((livros) => {
      res.status(200);
      res.json(livros);
    })
    .catch((err) => {
      res.status(500);
      res.json({ erro: "Não foi possivel executar a função de get." });
    });
});
//Pega os dados de um unico livro
router.get("/mylivros/:id", (req, res) => {
  var id = req.params.id;
  Mybooks.findAll({ where: { id: id } })
    .then((livros) => {
      res.status(200);
      res.json(livros);
    })
    .catch((err) => {
      res.status(500);
      res.json({ erro: "Não foi possivel executar a função de get." });
    });
});
// Cadastra livro na sua biblioteca
router.post("/mylivros", (req, res) => {
  let { bookName, autorName, resume } = req.body;

  if (autorName != "" || bookName != "") {
    if (autorName != undefined || bookName != undefined) {
      Mybooks.create({
        name: bookName,
        autor: autorName,
        resume: resume,
      })
        .then(() => {
          res.status(200);
          res.send({ msg: "Book salvo" });
        })
        .catch(() => {
          res.status(500);
          res.json({ erro: "Criação invalida!" });
        });
    } else {
      res.status(400);
      res.json({ erro: "Informações invalidas ou null." });
    }
  } else {
    res.status(400);
    res.json({ erro: "Informações invalidas ou null." });
  }
});
//Edita um livro da sua biblioteca
router.put("/mylivros/:id", auth, (req, res) => {
  var id = parseInt(req.params.id);
  var { nomeBook, autorBook, resume } = req.body;

  if (id != undefined) {
    Mybooks.findOne({ where: { id: id } })
      .then((result) => {
        if (result != undefined) {
          var book = { ...result };
          if (nomeBook != undefined) book.name = nomeBook;
          if (autorBook != undefined) book.autor = autorBook;
          if (resume != undefined) book.resume = resume;

          Mybooks.update(
            { name: book.name, autor: book.autor, resume: book.resume },
            { where: { id: id } }
          )
            .then(() => {
              res.status(200);
              res.json({ msg: "Livro editado com sucesso!" });
            })
            .catch((err) => {
              res.status(500);
              res.json({ erro: "Erro ao editar livro." });
            });
        } else {
          res.status(400);
          res.json({ erro: "Id invalido!" });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ erro: "Não foi possivel editar este livro." });
      });
  } else {
    res.status(400);
    res.json({ erro: "Id invalido!" });
  }
});
//Delete um livro da sua biblioteca
router.delete("/mylivros/:id", auth, (req, res) => {
  var id = req.params.id;

  Mybooks.destroy({ where: { id: id } })
    .then(() => {
      res.status(200);
      res.json({ msg: "book deletado" });
    })
    .catch((err) => {
      res.status(401);
      res.json({ erro: "Registro não encontrado" });
    });
});

//Wish list

router.get("/wish-list", (req, res) => {
  wishBooks
    .findAll()
    .then((livros) => {
      res.status(200);
      res.json(livros);
    })
    .catch((err) => {
      res.status(500);
      res.json({ erro: "Não foi possivel executar a função de get." });
    });
});
router.get("/wish-list/:id", (req, res) => {
  var id = req.params.id;
  wishBooks
    .findAll({ where: { id: id } })
    .then((livros) => {
      res.status(200);
      res.json(livros);
    })
    .catch((err) => {
      res.status(500);
      res.json({ erro: "Não foi possivel executar a função de get." });
    });
});
router.post("/wish-list", (req, res) => {
  let { bookName, autorName, resume } = req.body;

  if (autorName != "" || bookName != "") {
    if (autorName != undefined || bookName != undefined) {
      wishBooks
        .create({
          name: bookName,
          autor: autorName,
          resume: resume,
        })
        .then(() => {
          res.status(200);
          res.send({ msg: "Book salvo" });
        })
        .catch(() => {
          res.status(500);
          res.json({ erro: "Criação invalida!" });
        });
    } else {
      res.status(400);
      res.json({ erro: "Informações invalidas ou null." });
    }
  } else {
    res.status(400);
    res.json({ erro: "Informações invalidas ou null." });
  }
});
router.put("/wish-list/:id", auth, (req, res) => {
  var id = parseInt(req.params.id);
  var { nomeBook, autorBook, resume } = req.body;

  if (id != undefined) {
    wishBooks
      .findOne({ where: { id: id } })
      .then((result) => {
        if (result != undefined) {
          var book = { ...result };
          if (nomeBook != undefined) book.name = nomeBook;
          if (autorBook != undefined) book.autor = autorBook;
          if (resume != undefined) book.resume = resume;

          wishBooks
            .update(
              { name: book.name, autor: book.autor, resume: book.resume },
              { where: { id: id } }
            )
            .then(() => {
              res.status(200);
              res.json({ msg: "Livro editado com sucesso!" });
            })
            .catch((err) => {
              res.status(500);
              res.json({ erro: "Erro ao editar livro." });
            });
        } else {
          res.status(400);
          res.json({ erro: "Id invalido!" });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ erro: "Não foi possivel editar este livro." });
      });
  } else {
    res.status(400);
    res.json({ erro: "Id invalido!" });
  }
});
router.delete("/wish-list/:id", auth, (req, res) => {
  var id = req.params.id;

  wishBooks
    .destroy({ where: { id: id } })
    .then(() => {
      res.status(200);
      res.json({ msg: "book deletado" });
    })
    .catch((err) => {
      res.status(401);
      res.json({ erro: "Registro não encontrado" });
    });
});

module.exports = router;
