import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userEmail, selectedText } = req.body;

    try {
        const session = await getSession({ req });
        console.log(session.user);
        if (!session) {
          return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        // Verifique se o email do usuário autenticado corresponde ao email enviado pelo cliente
        if (session.user.email !== userEmail) {
          return res.status(403).json({ error: 'Acesso negado.' });
        }

        const userId = session.user.id; 

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