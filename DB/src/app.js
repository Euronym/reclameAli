// módulo para a criação da API
const express = require("express");
// módulo para tratamento de erros.
const morgan = require("morgan");
// requisita o módulo necessário para realizar a conexão com o banco de dados.
const mongoose = require("mongoose");
// módulo para a variável de ambiente.
const dotenv = require("dotenv");

const bodyParser = require("body-parser");

dotenv.config();

// faz as solicitações para as rotas.
const reclamacoesRoutes = require("./api/routes/reclamacoes");
const operadoresRoutes = require("./api/routes/operadores");
const tecnicosRoutes = require("./api/routes/tecnicos");

// realiza a conexão com o banco de dados, com a senha para o cluster armazenada em uma variável de ambiente.
mongoose.connect("mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":" + process.env.MONGO_ATLAS_PW + "@cluster0.sydlt.mongodb.net/projetos2DB?retryWrites=true&w=majority",
{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}
).catch(err => console.log(err));

const app = express();
// inicia a conexão do servidor com a porta 3000
app.listen(3000, ()=> {
    console.log("connection started at port 3000.");
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// utiliza as rotas solicitadas para atender pedidos.
app.use('/reclamacoes', reclamacoesRoutes);
app.use('/operadores', operadoresRoutes);
app.use('/tecnicos', tecnicosRoutes);

// rotas default para o caso de possíveis erros no atendimento de solicitação
app.use((req, res, next) => {
    const error = new Error('not found');
    // retorna 404 por não conseguir encontrar o recurso buscado.
    error.status = 404;
    next(error);
});

app.use((req, res, next) => { 
    res.status(error.status || 500);
    res.json({
        message: error.message
    });     
});

module.exports = app;