import Funcionario

class tecnico(Funcionario.Funcionario):
    def __init__(self,id,nome,email,senha, telefone,cargo, estaDisponivel):
        super().__init__(id,nome,email,senha,telefone,cargo)
        self.estaDisponivel = estaDisponivel
    