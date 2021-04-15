import pymongo

client = pymongo.MongoClient() # faz a conexão com o banco de dados 

projetosDB = client['projetosDB']

clientes = projetosDB['clientes']
operadores = projetosDB['operadores']
reclamacoes = projetosDB['reclamacoes']
tecnicos = projetosDB['tecnicos']






