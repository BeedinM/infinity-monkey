import styles from './inicio.module.css';
import Link from 'next/link';

export default function Inicio() {
    return (
        <div className={styles.telaInicio}>
            <div className={styles.tituloInicio}>SEJA BEM VINDO</div>
            
            <Link href='/api/auth/signin' className={styles.txtLogin}>
                <div>FAZER LOGIN</div>
            </Link>
        </div>
    )
};