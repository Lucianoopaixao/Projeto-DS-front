-- CreateEnum
CREATE TYPE "horarios_uso_dia_semana" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'TODOS');

-- CreateTable
CREATE TABLE "check_in" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nome_medicamento" VARCHAR(100) NOT NULL,
    "duracao_semanas" INTEGER NOT NULL,
    "data_inicio" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moedaspcadastro" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "check_in_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_external_id_key" ON "users"("external_id");

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios_uso" ADD CONSTRAINT "horarios_uso_checkin_id_fkey" FOREIGN KEY ("checkin_id") REFERENCES "check_in"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registro_consulta" ADD CONSTRAINT "registro_consulta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
