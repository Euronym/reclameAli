![alt text](https://www.calendariodovestibular.com.br/wp-content/uploads/2013/08/post_ufpa.png)

# API Desenvolvida para a disciplina de projetos II.

- RAIZ DA API

    https://shielded-island-23034.herokuapp.com/
    
Abaixo, é possível encontrar uma lista das operações suportadas e seus respectivos links de acesso.


- OBTER RECLAMAÇÃO

    - Uma reclamação
   
    GET https://shielded-island-23034.herokuapp.com/reclamacoes/:reclamacaoId
              
        - Parâmetros necessários
            
            - _id: Object
            
    GET https://shielded-island-23034.herokuapp.com/reclamacoes/top-priority
    
        - Parâmetros necessários
       
            - nenhum
           
    - Múltiplas reclamações

    GET https://shielded-island-23034.herokuapp.com/reclamacoes/reclamacoes
    
        - Parâmetros necessários
            
            - nenhum

- REGISTRAR RECLAMAÇÃO

    - Uma reclamação
     
    POST https://shielded-island-23034.herokuapp.com/reclamacoes
    
        - Parâmetros necessários
        
            - unidadeConsumidora: String
            - tipoReclamacao: String 
    
- REMOVER RECLAMAÇÃO
    
    - Uma reclamação

    DELETE https://shielded-island-23034.herokuapp.com/reclamacoes/:reclamacaoId
    
        - Parâmetros necessários
    
            - _id: Object
    
- LOGAR COMO OPERADOR
    
    POST https://shielded-island-23034.herokuapp.com/operadores/login
    
        - Parâmetros necessários
   
            - email: String
            - senha: String  

- REGISTRAR OPERADOR

    POST https://shielded-island-23034.herokuapp.com/operadores/signup
    
        - Parâmetros necessários
    
            - nome: String
            - telefone: Number
            - email: String
            - senha: String
            - cargo: String
    
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

