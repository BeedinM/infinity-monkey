/* import prisma from '../lib/prisma.js';

export async function getStaticProps() {
    const allUsers = await prisma.usuario.findMany();
    console.log(allUsers);
  
    return {
      props: {
        users: allUsers,
      },
    };
  }

export default function Usuarios({ users }) {
    return (
        <main>
        <h1>Lista de Usuários</h1>
        <ul>
            {users.map((user) => (
            <li key={user.id}>{user.nomeUsuario}</li>
            ))}
        </ul>
        </main>
    );
} */