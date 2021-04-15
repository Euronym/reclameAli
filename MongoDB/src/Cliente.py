import Pessoa, Reclamacao

class Cliente(Pessoa.Pessoa):
    def __init__(self, CPF, RG, unidadeConsumidora, estaRegular, CEP,id,nome,email,senha, telefone):
        super().__init__(id,nome,email,senha, telefone)
        self.estaRegular = estaRegular
        self.CPF = CPF
        self.RG = RG
        self.CEP = CEP
        self.unidadeConsumidora = unidadeConsumidora
    def realizarReclamacao(self, tipoReclamacao):
        if self.estaRegular == True:
        #Verifica a situação do cliente, retornando a reclamação caso regular e -1 caso não.
            novaReclamacao = Reclamacao.Reclamacao(tipoReclamacao, self.CEP)
            return novaReclamacao 
        else:
            return -1