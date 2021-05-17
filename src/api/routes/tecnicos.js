const express = require("express");

const router = express.Router();

const tecnicoController = require("../controllers/tecnicoController");

router.post("/", tecnicoController.add_one);

router.get("/:tecnicoId", tecnicoController.get_one);

router.patch("/:tecnicoId", tecnicoController.edit_state);

router.delete("/:tecnicoId", tecnicoController.delete_one);

module.exports = router;