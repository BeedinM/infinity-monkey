import { signOut } from 'next-auth/react';
import { useState } from 'react';

import styles from './leftPerf.module.css';

export default function LeftPerf({ nomeUser, imgUser, userEmail}) {
    const [ listaDePalavras, setListaDePalavras ] = useState([]);

    const listaPalavras = async () => {
        try {
            const response = await fetch(`/api/palavras/?userEmail=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const words = data.foundWord.map(item => [item.word]);
                setListaDePalavras(words);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Erro ao consultar palavras', error);
            alert('Erro ao consultar palavras');
        }
    }

    return (
        <div className={styles.perfContainer}>
            <div className={styles.imgPerfil}>
                <img src={imgUser}></img>
            </div>

            <div className={styles.divNome}>
                <p>{nomeUser}</p>
            </div>

            <div className={styles.divPts}>
                <p>pontos:</p>
            </div>

            <div onClick={() => listaPalavras()} className={styles.divPalavras}>
                <p>Palavras encontradas</p>
                <div>{listaDePalavras}</div>
            </div>

            <button onClick={() => signOut()}>
                <p>Log out</p>
            </button>
        </div>
    )
}