import prisma from '@/lib/prisma';

async function checkWordInDictionary(word) {
  const response = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
  const data = await response.json();

  // Verificar se o objeto de resposta contém dados (propriedades)
  return Object.keys(data).length > 0;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, selectedText } = req.body;

    try {
      const wordExists = await checkWordInDictionary(selectedText);
      if (wordExists) {
        const foundWord = await prisma.foundWord.findFirst({
          where: {
            userId,
            word: selectedText,
          },
        });

        if (foundWord) {
          return res.status(400).json({ error: 'Palavra já encontrada.' });
        }

        const score = selectedText.length;
        const newWord = await prisma.foundWord.create({
          data: {
            word: selectedText,
            score,
            user: { connect: { id: userId } },
          },
        });

        return res.json({ message: 'Palavra salva com sucesso!', word: newWord });
      } else {
        return res.status(400).json({ error: 'Palavra não encontrada no dicionário.' });
      }
    } catch (error) {
      console.error('Erro ao salvar a palavra:', error);
      return res.status(500).json({ error: 'Erro ao salvar a palavra.' });
    }
  }
}