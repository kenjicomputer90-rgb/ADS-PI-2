
-- CLIENTE
CREATE TABLE CLIENTE (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(40),
    cpf VARCHAR(14) UNIQUE,
    endereco VARCHAR(100)
);

-- USUARIO
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(400),
    senha VARCHAR(20),
    perfil VARCHAR(40)
);

-- PECA
CREATE TABLE PECA (
    id_peca INT AUTO_INCREMENT PRIMARY KEY,
    codigo_unico VARCHAR(40),
    descricao VARCHAR(100),
    tamanho VARCHAR(10),
    cor VARCHAR(30)
);

-- STATUS_PECA
CREATE TABLE STATUS_PECA (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(40)
);

-- LOCACAO
CREATE TABLE LOCACAO (
    id_locacao INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    data_evento DATE,

    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

-- PAGAMENTO
CREATE TABLE PAGAMENTO (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_locacao INT NOT NULL,
    valor DECIMAL(10,2),

    FOREIGN KEY (id_locacao) REFERENCES LOCACAO(id_locacao)
);

-- ITEM_LOCACAO (associativa)
CREATE TABLE ITEM_LOCACAO (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_locacao INT NOT NULL,
    id_peca INT NOT NULL,

    FOREIGN KEY (id_locacao) REFERENCES LOCACAO(id_locacao),
    FOREIGN KEY (id_peca) REFERENCES PECA(id_peca)
);

-- AJUSTE
CREATE TABLE AJUSTE (
    id_ajuste INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT NOT NULL,
    descricao VARCHAR(150),

    FOREIGN KEY (id_item) REFERENCES ITEM_LOCACAO(id_item)
);

-- MANUTENCAO
CREATE TABLE MANUTENCAO (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_peca INT NOT NULL,
    descricao VARCHAR(150),
    data_manutencao DATE,

    FOREIGN KEY (id_peca) REFERENCES PECA(id_peca)
);

-- HISTORICO_PECA
CREATE TABLE HISTORICO_PECA (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_peca INT NOT NULL,
    id_status INT NOT NULL,
    data_inicio DATE,
    data_fim DATE,

    FOREIGN KEY (id_peca) REFERENCES PECA(id_peca),
    FOREIGN KEY (id_status) REFERENCES STATUS_PECA(id_status)
);