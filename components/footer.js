import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.divFooter}>GitHub: <a href='https://github.com/BeedinM/infinity-monkey'>BeedinM</a></div>
        </footer>
    )
}