from abc import abstractmethod
from abc import ABCMeta

class Pessoa(metaclass = ABCMeta):   

    def __init__(self,id,nome,email,senha, telefone):
        self.id = id
        self.nome = nome
        self.email = email
        self.senha = senha
        self.telefone = telefone
    def redefinirSenha(self, novaSenha):
        print("hello world")
    def redefinirEmail(self, novoEmail):
        print("hello world")
    @abstractmethod #definição de método abstrato
    def redefinirDados(self):
        pass
