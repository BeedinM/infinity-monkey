import prisma from '../lib/prisma.js';
import { useEffect } from 'react';



async function getUser() {
    const allUsers = await prisma.usuario.findMany();
    console.log(allUsers); 
}

export default function Testes() {
    useEffect(() => {
      getUser();
    }, []);
  
    return (
      <main>
        <h1>Testando ORM</h1>
        <button onClick={getUser}>APERTA AQUI</button>
      </main>
    )
  }