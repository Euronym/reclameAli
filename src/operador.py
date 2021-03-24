import Funcionario

class Operador(Funcionario.Funcionario):
    def __init__(self,id,nome,email,senha, telefone,cargo):
        super().__init__(id,nome,email,senha, telefone, cargo)
    
