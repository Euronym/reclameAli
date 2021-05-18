/*
*   Arquivo para a verificação de autenticações: verifica se o usuário possui permissão para
*  acessar determinado recurso fornecido pela api. 
*/
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {

     /*
        Verifica se o usuário possui acesso ao recurso solicitado.
        Basicamente, a autenticação funciona com duas chaves: A "jWT_KEY" é 
        destinada ao servidor e o token é fornecido pelo usuário que fez a
        solicitação. Um erro é retornado em caso de falhas no acesso.
    */
    try{
        const decodificar = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.dadosUsuario = decodificar;
        next();

    } catch(erro){
        res.status(401).json({mensagem: "falha na autenticação."});
    }
}