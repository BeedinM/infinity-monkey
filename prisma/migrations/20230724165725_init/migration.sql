-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palavra" (
    "id" SERIAL NOT NULL,
    "palavra" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL,

    CONSTRAINT "Palavra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PalavraEncontrada" (
    "id" SERIAL NOT NULL,
    "dataEncontro" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "palavraId" INTEGER NOT NULL,

    CONSTRAINT "PalavraEncontrada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Palavra_palavra_key" ON "Palavra"("palavra");

-- AddForeignKey
ALTER TABLE "PalavraEncontrada" ADD CONSTRAINT "PalavraEncontrada_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PalavraEncontrada" ADD CONSTRAINT "PalavraEncontrada_palavraId_fkey" FOREIGN KEY ("palavraId") REFERENCES "Palavra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
