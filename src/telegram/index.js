// módulo para a implementação do chatbot.
const {Telegraf} = require("telegraf");
// módulo para gerenciamento do banco de dados.
const mongoose = require("mongoose");
// importa o modelo para instanciação da reclamação.
const Reclamacao = require("../api/models/reclamacaoModel");
// importa o modelo para autenticação do cliente.
const Cliente = require("../api/models/clienteModel");
// importa o módulo para configuração das variáveis de ambiente.
const dotenv = require("dotenv");
// indica o caminho do arquivo em que as variáveis se encontram e configura.
dotenv.config({ path: "../.env" });

// as reclamações disponíveis no banco de dados.
const prioridades = {
  "prioridade_1": {
    "tipo_reclamacao": "Reestabelecimento do fornecimento de energia",
    "prioridade_associada": "1"
  },

  "prioridade_2": {
    "tipo_reclamacao": "Falta de energia",
    "prioridade_associada": "2"
  },

  "prioridade_3": {
    "tipo_reclamacao": "Acidente na rede elétrica",
    "prioridade_associada": "3"
  }
};

/** 
    Retorna o tipo de reclamação associada com o número informado pelo usuário na interface com
    o cliente. Novos tipos podem ser definidos e em uma implementação mais flexível talvez as 
    reclamações poderiam ser armazenadas no próprio banco de dados, dando liberdade à não
    programadores de criar suas próprias reclamações.

    @param prioridadeAssociada o tipo da reclamação fornecida pelo usuário.
    @returns a string associada com aquele número.
*/
function calcularReclamacao(prioridadeAssociada) {

  let returnReclamacao;

  switch (prioridadeAssociada) {
    case 1:
      returnReclamacao = prioridades.prioridade_1.tipo_reclamacao;
      break;
    case 2:
      returnReclamacao = prioridades.prioridade_2.tipo_reclamacao;
      break;
    case 3:
      returnReclamacao = prioridades.prioridade_3.tipo_reclamacao;
      break;
  }
  return returnReclamacao;
}
const first_message = "Olá, bem vindo ao Reclame Ali. Para que possamos atender sua solicitação, " +
  "digite abaixo os digitos de sua unidade consumidora.";

const second_message = "Em seguida, selecione a reclamação que deseja realizar entre as disponíveis: \n";

// passa como atributo o TOKEN utilizado para conexão com a API do telegram.
const bot = new Telegraf(process.env.BOT_TOKEN);

let unidadeConsumidora;

// inicializa o chatbot, exibindo uma mensagem inicial para o cliente.
bot.start((ctx) => {
  ctx.reply(first_message);
});
/*
  basicamente, aqui são definidas algumas respostas para possíveis mensagens dos clientes. 
  Como essas mensagens são em partes triviais, nos limitamos a responder com a própria mensagem.
*/
let opcao = ['oi', 'olá', 'ola', 'boa tarde', 'bom dia', 'boa noite', 'tudo bem', 'como está?'];
bot.hears(opcao, (ctx) => {
  msg = ctx.message.text;
  ctx.reply(msg);
});

// aguarda a mensagem informada pelo usuário antes de realizar uma nova execução.
bot.on('text', (ctx) => {
  if (Number.isInteger(Number(ctx.message.text))) {
    Cliente.findOne({ unidadeConsumidora: Number(ctx.message.text) }, (err, cliente) => {
      if (err) {
        console.log(err);
        ctx.reply("Um erro aconteceu, por favor tente novamente.");
      }
      if (!cliente) {
        ctx.reply("A unidade consumidora informada é inválida.");
      }
      else {
        // exibe no terminal informações do cliente que realizou a reclamação.
        console.log(cliente);
        unidadeConsumidora = ctx.message.text;
        // Feita a autenticação do usuário, podemos exibir as opções de reclamação suportadas pelo serviço.
        ctx.telegram.sendMessage(ctx.chat.id, " Olá " + cliente.nome + ".\n" + second_message,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Reestabelecimento do fornecimento de energia", callback_data: "1" }],
                [{ text: "Falta de energia", callback_data: "2" }],
                [{ text: "Acidente na rede elétrica", callback_data: "3" }]
              ]
            }
          });
      }
    });
  }
  // se os dados informados pelo usuário não forem números inteiros, a solicitação pode ser descartada instantaneamente
  else {
    ctx.reply("Desculpe, não consigo atender a sua solicitação: dados inválidos.");
  }
});
/**
 * Função para criação de uma reclamação. Obtidas e autenticadas as informações do cliente, é possível 
 * adicionar o recurso criado no banco de dados. Para isso, alguns dados são deduzidos pelo sistema como
 * por exemplo, o tipo da reclamação. Além disso, alguns erros podem ocorrer durante a instanciação dessa
 * reclamação. Com isso em mente, uma promessa é retornada indicando se tudo ocorreu bem ou não.
 * 
 * 
 * @param prioridadeAssociada prioridade associada à reclamação feita. 
 * @returns o tipo da reclamação a ser armazenada no banco de dados em caso de sucesso, o erro em caso
 * de fracasso.
 */
function create_reclamacao(prioridadeAssociada){

  return new Promise( (resolve, reject) => {
    Cliente.findOne({ unidadeConsumidora: unidadeConsumidora }, (err, cliente) => {
      if (err) {
        reject();
      }
      if (!cliente) {
        reject();
      }
      else {
        const reclamacao = new Reclamacao({
          _id: new mongoose.Types.ObjectId(),
          unidadeConsumidora: cliente.unidadeConsumidora,
          tipoReclamacao: String(calcularReclamacao(prioridadeAssociada)),
          prioridadeAssociada: Number(prioridadeAssociada),
          local: {
            cep: cliente.cep,
            complemento: cliente.complemento
          }
        });
        reclamacao.save().then(_response => {
          resolve();
        }).catch(_err => {
          console.log("erro 3");
          reject();
        });
      }
    });
  });
}
/* 
  passa diferentes parâmetros para a função dependendo da opção selecionada. cada diferente
  parâmetro irá gerar uma diferente reclamação a ser armazenada no banco de dados.

*/
bot.action("1", async (ctx) => {
  create_reclamacao(1)
  .then(_result => {
    ctx.reply("Sua solicitação foi concluída com sucesso! Agora é só aguardar o atendimento.");
  })
  .catch(_err => {
    ctx.reply("Um erro aconteceu, por favor tente novamente.");
  });
});
bot.action("2", async (ctx) => {
  create_reclamacao(2)
  .then(_result => {
    ctx.reply("Sua solicitação foi concluída com sucesso! Agora é só aguardar o atendimento.");
  })
  .catch(_err => {
    ctx.reply("Um erro aconteceu, por favor tente novamente.");
  });
});
bot.action("3", async (ctx) => {
  create_reclamacao(3)
  .then(_result => {
    ctx.reply("Sua solicitação foi concluída com sucesso! Agora é só aguardar o atendimento.");
  })
  .catch(_err => {
    ctx.reply("Um erro aconteceu, por favor tente novamente.");
  });
});
bot.launch();









