import styles from './selectModal.module.css';

export default function SelectModal({ selectedText, onClose, onConfirm }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>Texto selecionado: {selectedText}</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};