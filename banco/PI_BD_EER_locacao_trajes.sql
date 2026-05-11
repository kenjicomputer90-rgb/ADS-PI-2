USE locacao_trajes;

-- CLIENTE
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60),
    telefone VARCHAR(15),
    email VARCHAR(40),
    cpf VARCHAR(14),
    endereco VARCHAR(100)
);

-- USUARIO
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60),
    email VARCHAR(40),
    senha VARCHAR(20),
    perfil VARCHAR(40)
);

-- LOCACAO
CREATE TABLE locacao (
    id_locacao INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_usuario INT,
    data_evento DATE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- PAGAMENTO
CREATE TABLE pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_locacao INT,
    valor DECIMAL(10,2),
    FOREIGN KEY (id_locacao) REFERENCES locacao(id_locacao)
);

-- PECA
CREATE TABLE peca (
    id_peca INT AUTO_INCREMENT PRIMARY KEY,
    codigo_unico VARCHAR(40),
    descricao VARCHAR(100),
    tamanho VARCHAR(10),
    cor VARCHAR(30)
);

-- ITEM_LOCACAO (ENTIDADE ASSOCIATIVA)
CREATE TABLE item_locacao (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_locacao INT,
    id_peca INT,
    FOREIGN KEY (id_locacao) REFERENCES locacao(id_locacao),
    FOREIGN KEY (id_peca) REFERENCES peca(id_peca)
);

-- AJUSTE
CREATE TABLE ajuste (
    id_ajuste INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT,
    descricao VARCHAR(150),
    FOREIGN KEY (id_item) REFERENCES item_locacao(id_item)
);

-- MANUTENCAO
CREATE TABLE manutencao (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_peca INT,
    descricao VARCHAR(150),
    data_manutencao DATE,
    FOREIGN KEY (id_peca) REFERENCES peca(id_peca)
);

-- STATUS_PECA
CREATE TABLE status_peca (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(40)
);

-- HISTORICO_PECA
CREATE TABLE historico_peca (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_peca INT,
    id_status INT,
    data_inicio DATE,
    data_fim DATE,
    FOREIGN KEY (id_peca) REFERENCES peca(id_peca),
    FOREIGN KEY (id_status) REFERENCES status_peca(id_status)
);

