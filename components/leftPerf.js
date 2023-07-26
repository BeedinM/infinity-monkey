import { signOut } from 'next-auth/react';

import styles from './leftPerf.module.css';

export default function LeftPerf({ nomeUser, imgUser}) {
    console.log(nomeUser);

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

            <div className={styles.divPalavras}>
                <p>Palavras encontradas</p>
            </div>

            <button onClick={() => signOut()}>
                <p>Log out</p>
            </button>
        </div>
    )
}