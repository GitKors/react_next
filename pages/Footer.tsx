import styles from '../styles/Footer.module.css'

export default function Footer () {
    return (
        <footer>
            <div className={styles.footer}>
                <p style={{ fontWeight: 'bold' }}>Книжный Интернет-магазин: React + Next.js, SkillFactory, Корсаков Алексей 2023г.</p>
            </div>
        </footer>
    )
}