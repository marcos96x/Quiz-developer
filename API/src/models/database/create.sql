drop database db_quiz;
create database db_quiz;
use db_quiz;
create table tb_usuario(
	id_usuario int not null auto_increment,
    nm_usuario varchar(70) not null,
    hr_jogada time,
    score_usuario int not null,
    
    constraint pk_usuario
		primary key(id_usuario)
);

create table tb_questao(
	id_questao int not null auto_increment,
    pergunta varchar(800) not null,
	alternativa_1 varchar(800) not null,
    alternativa_2 varchar(800) not null,
    alternativa_3 varchar(800) not null,
    alternativa_4 varchar(800) not null,
    resposta int(1) not null,
    
    constraint pk_questao
		primary key(id_questao)
);