const express = require("express");

const router = express.Router();

const reclamacaoController = require("../controllers/reclamacaoController");


// Rota para o envio de uma reclamação ao banco de dados.
router.post("/",reclamacaoController.store);
// Rota para a obtenção de todas as reclamações do banco de dados.
router.get("/",reclamacaoController.get_all);
// obtém, entre todas as reclamações armazenadas no banco de dados, aquela mais importante.
router.get("/top-priority", reclamacaoController.get_priority);
// Rota para a obtenção de uma única reclamação do banco de dados.
router.get("/:reclamacaoId",reclamacaoController.get_one);
// Rota para a remoção de uma reclamação do banco de dados.    
router.delete("/:reclamacaoId",reclamacaoController.delete_one);

module.exports = router;
