import prisma from '../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nomeUsuario, email, senha } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nomeUsuario,
        email,
        senha,
      },
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}