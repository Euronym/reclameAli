import Pessoa

class Funcionario(Pessoa.Pessoa):
    def __init__(self,id,nome,email,senha, telefone,cargo):
        super().__init__(id,nome,email,senha, telefone)
        self.cargo = cargo
    