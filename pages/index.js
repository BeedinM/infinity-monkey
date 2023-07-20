import { useEffect, useState } from 'react';
import SelectModal from '@/components/selectModal';

import styles from '../styles/styles.module.css';

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

async function checkWordInDictionary(word) {
  const response = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
  const data = await response.json();

  // Verificar se o objeto de resposta contém dados (propriedades)
  return Object.keys(data).length > 0;
}

export default function Inicio() {
  const [textoMacaco, setTextoMacaco] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [palavras, setPalavras] = useState([]);

  const handleSelection = () => {
    const text = window.getSelection().toString();
    setSelectedText(text);
  };

  const handleConfirm = async () => {
    const wordExists = await checkWordInDictionary(selectedText);
    if (wordExists) {
      setPalavras((prevPalavras) => [...prevPalavras, selectedText]);
    } else {
      alert('Palavra não encontrada no dicionário.');
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Mostrar o modal somente se houver texto selecionado
    if (selectedText) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedText]);

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
      {/* Renderizar o componente de modal somente quando houver texto selecionado */}
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