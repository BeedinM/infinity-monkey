import { useEffect, useState } from 'react';

import styles from '../styles/styles.module.css';

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

export default function Inicio() {
  const [textoMacaco, setTextoMacaco] = useState([]);

  const handleSelection = () => {
    const selectedText = window.getSelection().toString();
    console.log('Texto selecionado:', selectedText);
    // Aqui eu posso fazer o que quiser com o texto selecionado,
    // como enviar para um estado do componente, exibir em um modal, etc.
  };

  //script pegar e armazenar uma letra aleatória a x tempo
  useEffect(() => {
    const interval = setInterval(() => {
      setTextoMacaco((prevTextoMacaco) => [
        ...prevTextoMacaco,
        letras[Math.floor(Math.random() * letras.length)],
      ]);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.divGif}>

      </div>
      <div className={styles.divTxt} onMouseUp={handleSelection}>
        {textoMacaco.map((letra, index) => (
          <span key={index}>{letra}</span>
        ))}
      </div>
    </div>
  );
}