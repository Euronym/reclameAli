const express = require("express");

const router = express.Router();

//  importa o módulo contendo todos os tratamentos necessários para cada verbo.
const operadorController = require("../controllers/operadorController");

// rota para criação de operadores.
router.post("/signup", operadorController.create_one);

// rota experimental. Não faz parte da abstração trabalhada mais foi considerada pela necessidade de haver clientes.
router.post("/clienteRegister", operadorController.create_client);
    
// rota para a autenticação na interface do operador.
router.post("/login", operadorController.login);

// rota pra a obtenção de um operador utilizando a id associada.
router.get("/:operadorId", operadorController.get_one);

// rota para atualização de algum atributo do operador. Estamos trabalhando somente com telefone e senha.
router.patch("/:operadorId", operadorController.edit_one);

// rota para a remoção de um operador da base de dados.
router.delete("/:operadorId", operadorController.remove_one);

// exporta a rota dos operadores para o programa principal.
module.exports = router;