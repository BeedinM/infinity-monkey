import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import SelectModal from '@/components/selectModal';

import styles from './jogo.module.css';

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

async function checkWordInDictionary(word) {
    const response = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
    const data = await response.json();
  
    // Verificar se o objeto de resposta contém dados (propriedades)
    return Object.keys(data).length > 0;
  }

export default function OJogo() {
    const [textoMacaco, setTextoMacaco] = useState([]);
    const [selectedText, setSelectedText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [palavras, setPalavras] = useState([]);
    const { data: session} = useSession();

    const handleSelection = () => {
        const text = window.getSelection().toString();
        setSelectedText(text);
      };
    
    const handleConfirm = async () => {
        const wordExists = await checkWordInDictionary(selectedText);
        if (wordExists) {
            // Chame a API para salvar a palavra encontrada
            console.log(session.user);
            const response = await fetch('/api/jogo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail: session.user.email, selectedText }),
            });

            const data = await response.json();
            if (response.ok) {
            setPalavras((prevPalavras) => [...prevPalavras, selectedText]);
            } else {
            alert(data.error);
            }
        } else {
            alert('Palavra não encontrada no dicionário.');
        }
        setShowModal(false);
        };

    const handleCancel = () => {
        setShowModal(false);
      };
    
    useEffect(() => {
        if (selectedText) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [selectedText]);

    useEffect(() => {
        const interval = setInterval(() => {
          setTextoMacaco((prevTextoMacaco) => [
            ...prevTextoMacaco,
            letras[Math.floor(Math.random() * letras.length)],
          ]);
        }, 250);
    
        return () => {
          clearInterval(interval);
        };
      }, []);

    return (
        <div className={styles.container}>
            {showModal && (
            <SelectModal
                selectedText={selectedText}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
            )}
            <div className={styles.tituloIM}>Infinity Monkey</div>
            <div className={styles.divGif}>
                <Image src='/images/monkey-typing.gif' width={320} height={240} alt='macaco' />
            </div>
            <div className={styles.divTxt} onMouseUp={handleSelection}>
            {textoMacaco.map((letra, index) => (
                <span key={index}>{letra}</span>
            ))}
            </div>
            <div>
            {palavras.map((palavra, index) => (
                <p key={index}>{index} {palavra}</p>
            ))}
            </div>
        </div> 
    );
};
