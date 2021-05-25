# API Desenvolvida para a disciplina de projetos II.

- RAIZ DA API

    https://shielded-island-23034.herokuapp.com/
    
Abaixo, é possível encontrar uma lista das operações suportadas e seus respectivos links de acesso.

- OBTER RECLAMAÇÃO

    - Uma reclamação
   
    GET https://shielded-island-23034.herokuapp.com/reclamacoes/:reclamacaoId

    GET https://shielded-island-23034.herokuapp.com/reclamacoes/top-priority

    - Múltiplas reclamações

    GET https://shielded-island-23034.herokuapp.com/reclamacoes/reclamacoes

- REGISTRAR RECLAMAÇÃO

    - Uma reclamação
     
    POST https://shielded-island-23034.herokuapp.com/reclamacoes
    
 - REMOVER RECLAMAÇÃO
    
    - Uma reclamação

    DELETE https://shielded-island-23034.herokuapp.com/reclamacoes/:reclamacaoId
    
    - Parâmetros necessários
    
        -   _id: Object
        -   email: String
        -   senha: String
    
- LOGAR COMO OPERADOR
    
    POST https://shielded-island-23034.herokuapp.com/operadores/login
    
    - Parâmetros necessários
   
        -   email: String
        -   senha: String  

- REGISTRAR OPERADOR

    POST https://shielded-island-23034.herokuapp.com/operadores/signup
    
    - Parâmetros necessários
    
        -   nome: String
        -   telefone: Number
        -   email: String
        -   senha: String
        -   cargo: String
    
- ATUALIZAR OPERADOR

    PATCH https://shielded-island-23034.herokuapp.com/operadores/:operadorId
    
 - REMOVER OPERADOR
 
    DELETE https://shielded-island-23034.herokuapp.com/tecnicos/:operadorId
     
- REGISTRAR TÉCNICO
 
    POST  https://shielded-island-23034.herokuapp.com/tecnicos/signup
    
- OBTER TÉCNICO

    - Um técnico
    
      GET https://shielded-island-23034.herokuapp.com/tecnicos/:tecnicoId
      
 - REMOVER TÉCNICO

     DELETE https://shielded-island-23034.herokuapp.com/tecnicos/:tecnicoId

- REGISTRAR USUÁRIO

    POST  https://shielded-island-23034.herokuapp.com/operadores/clienteRegister

