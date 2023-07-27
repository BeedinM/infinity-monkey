import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, selectedText } = req.body;

    try {
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
      } 
    catch (error) {
      console.error('Erro ao salvar a palavra:', error);
      return res.status(500).json({ error: 'Erro ao salvar a palavra.' });
    }
  }
}