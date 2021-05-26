const express = require("express");

const router = express.Router();
// importa as funções utilizadas para controle de recursos enas rotas do técnico.
const tecnicoController = require("../controllers/tecnicoController");

// rota para a adição de um técnico no banco de dados.
router.post("/signup", tecnicoController.add_one);
// rota para obter um técnico do banco de dados, utilizando para isso a sua id.
router.get("/:tecnicoId", tecnicoController.get_one);
// rota para obter todos os técnicos do banco de dados
router.get("/", tecnicoController.get_all);
// rota para atualização de um técnico no banco de dados.
router.patch("/:tecnicoId", tecnicoController.edit_state);
// rota para remoção de um técnico no banco de dados.
router.delete("/:tecnicoId", tecnicoController.delete_one);

// exporta as rotas para uso no programa principal.
module.exports = router;