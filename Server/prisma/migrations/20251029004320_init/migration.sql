-- CreateEnum
CREATE TYPE "horarios_uso_dia_semana" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'TODOS');

-- CreateTable
CREATE TABLE "check-in" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nome_medicamento" VARCHAR(100) NOT NULL,
    "duracao_semanas" INTEGER NOT NULL,
    "data_inicio" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moedaspcadastro" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "check-in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios_uso" (
    "id" SERIAL NOT NULL,
    "checkin_id" INTEGER NOT NULL,
    "dia_semana" "horarios_uso_dia_semana" NOT NULL,
    "horario" TIME(0) NOT NULL,
    "dose" VARCHAR(50),

    CONSTRAINT "horarios_uso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questoes" (
    "id" SERIAL NOT NULL,
    "pergunta" VARCHAR(255) NOT NULL,
    "alternativa_a" VARCHAR(255) NOT NULL,
    "alternativa_b" VARCHAR(255) NOT NULL,
    "alternativa_c" VARCHAR(255) NOT NULL,
    "alternativa_d" VARCHAR(255) NOT NULL,
    "resposta" VARCHAR(255) NOT NULL,
    "explicacaocerta" TEXT NOT NULL,
    "explicacaoerrada" TEXT NOT NULL,

    CONSTRAINT "questoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registro_consulta" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "data_consulta" DATE NOT NULL,
    "anexo_consulta" VARCHAR(255) NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moedaspanexo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "registro_consulta_pkey" PRIMARY KEY ("id")
);
