import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';


export default function Inicio() {
    const router = useRouter();
    /* const isActive = (pathname) => {
        return router.pathname === pathname;
    }; */
    const { data: session} = useSession();

    useEffect(() => {
        if (session) {
            router.push('/jogo');
        }
    }, [session, router]);
    
    return (
        <div>
            <Link href='/api/auth/signin'>FAZER LOGIN</Link>
        </div>
    );
};