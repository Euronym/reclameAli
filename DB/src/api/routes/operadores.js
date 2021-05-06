const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Operador = require("../models/operadorModel");

router.post("/", (req,res) => {
    const login = req.body.login;
    const senha = req.body.senha;

    res.status(200).json({
        "login": login,
        "senha": senha
        });
});
router.get("/:operadorId", (req,res) => {
    const id = req.params.operadorId;
    if(id === 'special')
        res.status(200).json({"message": "you picked the special id"});
    else
        res.status(200).json({"message": "you haven't picked the special id"});

});
router.patch("/:operadorId", (req,res) => {
    const email = req.body.email;
    const login = req.body.login;
});
router.delete("/:operadorId", (req,res) => {
    const id = req.params.operadorId;
    if(id === 'special')
        res.status(200).json({"message": "you picked the special id"});
    else
        res.status(200).json({"message": "you haven't picked the special id"});

});


module.exports = router;