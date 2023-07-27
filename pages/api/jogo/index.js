import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userEmail, selectedText } = req.body;

    // Obtém a sessão com base no email do usuário
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Encontre o usuário com base no email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // Verifique se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    try {
      const foundWord = await prisma.foundWord.findFirst({
        where: {
          userId: user.id,
          word: selectedText,
        },
      });

      if (foundWord) {
        return res.status(400).json({ error: 'Palavra já encontrada.' });
      }

      const score = selectedText.length;

      // Salve a palavra encontrada associada ao usuário encontrado pelo email
      const newWord = await prisma.foundWord.create({
        data: {
          word: selectedText,
          score,
          user: { connect: { id: user.id } }, // Use o id do usuário encontrado
        },
      });

      return res.json({ message: 'Palavra salva com sucesso!', word: newWord });
    } catch (error) {
      console.error('Erro ao salvar a palavra:', error);
      return res.status(500).json({ error: 'Erro ao salvar a palavra.' });
    }
  }
}