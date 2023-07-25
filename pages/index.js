import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import styles from '../styles/home.module.css';

import Inicio from '../components/inicio.js';

export default function Index() {
    const router = useRouter();
    const { data: session} = useSession();

    useEffect(() => {
        if (session) {
            router.push('/jogo');
        }
    }, [session, router]);
    
    return (
        <div className={styles.inicioDiv}>
            <Inicio />
        </div>
    );
};