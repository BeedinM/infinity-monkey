import { useEffect, useState } from 'react';
import SelectModal from '@/components/selectModal';

import styles from '../styles/styles.module.css';

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

export default function Inicio() {
  const [textoMacaco, setTextoMacaco] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [palavras, setPalavras] = useState([]);

  const handleSelection = () => {
    const text = window.getSelection().toString();
    setSelectedText(text);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setPalavras((prevPalavras) => [...prevPalavras, selectedText]);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  //script pegar e armazenar uma letra aleatória a x tempo
  useEffect(() => {
    const interval = setInterval(() => {
      setTextoMacaco((prevTextoMacaco) => [
        ...prevTextoMacaco,
        letras[Math.floor(Math.random() * letras.length)],
      ]);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Renderizar o componente de modal quando showmodal for true */}
      {showModal && (
        <SelectModal
          selectedText={selectedText}
          onClose={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      <div className={styles.divGif}></div>
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
}