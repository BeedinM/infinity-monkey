import { useSession } from 'next-auth/react';

import styles from '../styles/home.module.css';

import Loading from '../components/loading.js';
import Inicio from '../components/inicio.js';
import LeftPerf from '@/components/leftPerf';
import OJogo from '@/components/jogo';
import RightRank from '@/components/rightRank';

export default function Index() {
    const { data: session, status} = useSession();

    if(status === 'loading') {
        return (
            <div className={styles.inicioDiv}>
                <Loading />
            </div>
        )
    }

    if (session) {
        return (
            <div className={styles.divLogado}>
                <LeftPerf nomeUser={session.user.name} imgUser={session.user.image} userEmail={session.user.email}/>
                <OJogo />
                <RightRank />
            </div>
        );
    }
    
    return (
        <div className={styles.inicioDiv}>
            <Inicio />
        </div>
    );
};