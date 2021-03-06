// módulo para a criação da API
const express = require("express");
// módulo para tratamento de erros.
const morgan = require("morgan");
// requisita o módulo necessário para realizar a conexão com o banco de dados.
const mongoose = require("mongoose");
// módulo para a variável de ambiente.
const dotenv = require("dotenv");
// módulo para a conexão externa.
const cors = require("cors");

// configura as variáveis de ambiente a serem utilizadas.
dotenv.config();

// solicita o módulo que contém o chatbot.
require("./telegram/index");

// faz as solicitações para as rotas.
const reclamacoesRoutes = require("./api/routes/reclamacoes");
const operadoresRoutes = require("./api/routes/operadores");
const tecnicosRoutes = require("./api/routes/tecnicos");

// realiza a conexão com o banco de dados, com a senha para o cluster armazenada em uma variável de ambiente.
mongoose.connect("mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":" + process.env.MONGO_ATLAS_PW + "@cluster0.sydlt.mongodb.net/projetos2DB?retryWrites=true&w=majority",
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
}
).catch(err => console.log(err));

const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log("connection started!");
});

// permite a passagem de JSON e url encoded às requisições.
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

// permite a conexão entre diferentes hosts.
app.use(cors());
// obtém estatistícas relacionadas à conexão com o banco de dados.
app.use(morgan('dev'));

// utiliza as rotas solicitadas para atender pedidos.
app.use('/reclamacoes', reclamacoesRoutes);
app.use('/operadores', operadoresRoutes);
app.use('/tecnicos', tecnicosRoutes);

// rota para o caso do acesso de uma possível rota não existente, exibindo o erro 404.
app.use((req, res, next) => {
    const error = new Error('not found');
    // retorna 404 por não conseguir encontrar o recurso buscado.
    error.status = 404;
    next(error);
});
// relata problemas desconhecidos no acesso à determinada URL, diagnosticando um erro 500.
app.use((req, res, next) => { 
    res.status(error.status || 500);
    res.json({
        message: error.message
    });     
});
