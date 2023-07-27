import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { userEmail } = req.body;
    
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
            },
          });
            return res.json({ foundWord })
            
        } catch (error) {
          console.error('Erro ao encontrar palavras', error);
          return res.status(500).json({ error: 'Erro ao encontrar palavras' });
        }
      }
}