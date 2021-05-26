<p align="center">
<img src="http://linc.ufpa.br/amaru-mts/content/img/ufpa.png" alt="UFPA" width="200"/>
</p>

# API Desenvolvida para a disciplina de projetos II.

## RAIZ DA API

    https://shielded-island-23034.herokuapp.com/
    
Abaixo, é possível encontrar uma lista das operações suportadas e seus respectivos links de acesso.

## OBTER RECLAMAÇÃO

    - Uma reclamação
   
    GET https://shielded-island-23034.herokuapp.com/reclamacoes/:reclamacaoId

    GET https://shielded-island-23034.herokuapp.com/reclamacoes/top-priority

    - Múltiplas reclamações

    GET https://shielded-island-23034.herokuapp.com/reclamacoes/reclamacoes

## REGISTRAR RECLAMAÇÃO

    - Uma reclamação
     
    POST https://shielded-island-23034.herokuapp.com/reclamacoes
    
## REMOVER RECLAMAÇÃO
    
     - Uma reclamação

    DELETE https://shielded-island-23034.herokuapp.com/reclamacoes/:reclamacaoId
    
    - Parâmetros necessários
    
        -   _id: Object
        -   email: String
        -   senha: String
    
## LOGAR COMO OPERADOR
    
    POST https://shielded-island-23034.herokuapp.com/operadores/login
    
    - Parâmetros necessários
   
        -   email: String
        -   senha: String  

## REGISTRAR OPERADOR

    POST https://shielded-island-23034.herokuapp.com/operadores/signup
    
    - Parâmetros necessários
    
        -   nome: String
        -   telefone: Number
        -   email: String
        -   senha: String
        -   cargo: String
    
## ATUALIZAR OPERADOR

    PATCH https://shielded-island-23034.herokuapp.com/operadores/:operadorId
    - Parâmetros necessários (Arg1 | Arg2)
        -   email: String
        -   telefone: Number
    
## REMOVER OPERADOR
 
    DELETE https://shielded-island-23034.herokuapp.com/tecnicos/:operadorId
    - Parâmetros necessários
        -   email: String
        -   senha: String

## REGISTRAR TÉCNICO
 
    POST  https://shielded-island-23034.herokuapp.com/tecnicos/signup
    - Parâmetros necessários
        -   _id: Object
        -   nome: String
        -   telefone: Number
        -   email: String
        -   senha: String
    
## OBTER TÉCNICO

    ### Um técnico
    - Parâmetros necessários
        -   nome: String
    ### Todos os técnicos
    - Parâmetros necessários
        -   nenhum
    
    GET https://shielded-island-23034.herokuapp.com/tecnicos/:tecnicoId
      
## REMOVER TÉCNICO

    DELETE https://shielded-island-23034.herokuapp.com/tecnicos/:tecnicoId
    - Parâmetros necessários
        - _id: Object

## REGISTRAR CLIENTE

    POST  https://shielded-island-23034.herokuapp.com/operadores/clienteRegister
    - Parâmetros necessários
        - _id: Object
        - nome: String
        - senha: String
        - telefone: Number
        - email: String
        - cpf: Number
        - rg: Number
        - unidadeConsumidora: Number
        - estaRegular: Boolean
        - cep: Number
        - complemento: String

