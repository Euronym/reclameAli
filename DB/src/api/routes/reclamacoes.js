const express = require("express");

const router = express.Router();

const reclamacaoController = require("../controllers/reclamacaoController");

router.post("/",reclamacaoController.store);

router.get("/",reclamacaoController.get_all);

router.get("/:reclamacaoId",reclamacaoController.get_one);
    
router.delete("/:reclamacaoId",reclamacaoController.delete_one);

module.exports = router;
