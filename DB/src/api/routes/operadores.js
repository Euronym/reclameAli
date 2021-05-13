const express = require("express");

const router = express.Router();

const operadorController = require("../controllers/operadorController");

router.post("/", operadorController.create_one);
    
router.get("/", operadorController.get_all);

router.get("/:operadorId", operadorController.get_one);

router.patch("/:operadorId", operadorController.edit_one);

router.delete("/:operadorId", operadorController.remove_one);

module.exports = router;