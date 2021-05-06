const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Tecnico = require("../models/tecnicoModel");

router.post("/", (req,res) => {

    res.status(200).json({message: "post request"});
});
// obtém informações da primeira reclamação na lista.
router.get("/:tecnicoId", (req,res) => {
    const id = req.params.tecnicoId;
    if(id === 'special')
        res.status(200).json({message: "you picked the special id"});
    else
        res.status(200).json({message: "you haven't picked the special id"});

});
router.patch("/:tecnicoId", (req,res) => {

    res.status(200).json({message: "post request"});
});
router.delete("/:tecnicoId", (req,res) => {
    const id = req.params.tecnicoId;
    if(id === 'special')
        res.status(200).json({message: "you picked the special id"});
    else
        res.status(200).json({message: "you haven't picked the special id"});

});

module.exports = router;