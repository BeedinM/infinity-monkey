import { useEffect, useState } from 'react';

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

export default function Inicio() {
  const [textoMacaco, setTextoMacaco] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextoMacaco((prevTextoMacaco) => [
        ...prevTextoMacaco,
        letras[Math.floor(Math.random() * letras.length)],
      ]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {textoMacaco.map((letra, index) => (
        <span key={index}>{letra}</span>
      ))}
    </div>
  );
}