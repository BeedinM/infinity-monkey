import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import styles from './leftPerf.module.css';

export default function LeftPerf({ nomeUser, imgUser, userEmail}) {
    const [ listaDePalavras, setListaDePalavras ] = useState([]);
    const { data: session } = useSession();

    const listaPalavras = async () => {
            const response = await fetch('/api/palavras/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail: userEmail }),
            });

            const data = await response.json();
            if (response.ok) {
            setListaDePalavras(data);
            } else {
            alert(data.error);
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

            <div onLoad={() => listaPalavras()} className={styles.divPalavras}>
                <p>Palavras encontradas</p>
                <div>{listaDePalavras}</div>
            </div>

            <button onClick={() => signOut()}>
                <p>Log out</p>
            </button>
        </div>
    )
}