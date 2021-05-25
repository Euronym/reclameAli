/*
*   Arquivo para a verificação de autenticações: verifica se o usuário possui permissão para
*  acessar determinado recurso fornecido pela api. 
*
*   Infelizmente, essa atualização de segurança não pode ser implementada no código final por conta
*   do tempo disponível, mas poderia facilmente ser adicionada nas rotas para garantir o acesso seguro.
*/
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config({ path: '../.env' });

module.exports = (req, res, next) => {

     /*
        Verifica se o usuário possui acesso ao recurso solicitado.
        Basicamente, a autenticação funciona com duas chaves: A "jWT_KEY" é 
        destinada ao servidor e o token é fornecido pelo usuário que fez a
        solicitação. Um erro é retornado em caso de falhas no acesso.
    */
    try{
        // verifica o cabeçalho da solicitação em busca do token.
        const token = req.headers.authorization.split(" ")[1];

        // verifica se o token informado é válido.
        const decodificar = jwt.verify(token, process.env.JWT_KEY);
        req.dadosUsuario = decodificar;
        next();

    } catch(erro){
        res.status(401).json({mensagem: "falha na autenticação."});
    }
}