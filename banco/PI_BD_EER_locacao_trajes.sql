-- 1. CRIAÇÃO E SELEÇÃO DO BANCO DE DADOS
CREATE DATABASE IF NOT EXISTS locacao_trajes;
USE locacao_trajes;


-- 2. TABELAS INDEPENDENTES
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    perfil_acesso VARCHAR(40) NOT NULL
);

CREATE TABLE status_peca (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(40) NOT NULL
);

CREATE TABLE peca_produto (
    id_peca INT AUTO_INCREMENT PRIMARY KEY,
    codigo_unico VARCHAR(40) NOT NULL UNIQUE,
    descricao VARCHAR(100) NOT NULL,
    tamanho VARCHAR(10) NOT NULL,
    cor VARCHAR(30) NOT NULL,
    material VARCHAR(40),
    preco DECIMAL(10,2) NOT NULL
);


-- 3. SUBENTIDADES (ESPECIALIZAÇÕES)
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NULL,
    nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    rg VARCHAR(15),
    medidas TEXT,
    data_nascimento DATE,
    UNIQUE (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

CREATE TABLE funcionario (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(15),
    telefone VARCHAR(15),
    ctps VARCHAR(20),
    dependente INT DEFAULT 0,
    sexo CHAR(1),
    salario DECIMAL(10,2),
    data_nascimento DATE,
    estado_civil VARCHAR(20),
    UNIQUE (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);


-- 4. OPERAÇÕES DE NEGÓCIO
CREATE TABLE locacao (
    id_locacao INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    id_funcionario INT NOT NULL,
    data_evento DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_locacao INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_locacao) REFERENCES locacao(id_locacao) ON DELETE CASCADE
);


-- 5. LOGÍSTICA E MANUTENÇÃO
CREATE TABLE item_locacao (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_locacao INT NOT NULL,
    id_peca INT NOT NULL,
    FOREIGN KEY (id_locacao) REFERENCES locacao(id_locacao) ON DELETE CASCADE,
    FOREIGN KEY (id_peca) REFERENCES peca_produto(id_peca)
);

CREATE TABLE ajuste (
    id_ajuste INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT NOT NULL,
    descricao VARCHAR(150) NOT NULL,
    FOREIGN KEY (id_item) REFERENCES item_locacao(id_item) ON DELETE CASCADE
);

CREATE TABLE manutencao (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_peca INT NOT NULL,
    descricao VARCHAR(150) NOT NULL,
    data_manutencao DATE NOT NULL,
    FOREIGN KEY (id_peca) REFERENCES peca_produto(id_peca) ON DELETE CASCADE
);

CREATE TABLE historico_peca (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_peca INT NOT NULL,
    id_status INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    FOREIGN KEY (id_peca) REFERENCES peca_produto(id_peca) ON DELETE CASCADE,
    FOREIGN KEY (id_status) REFERENCES status_peca(id_status)
);