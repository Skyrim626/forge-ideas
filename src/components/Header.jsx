import { motion } from 'framer-motion'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <motion.div
        className={styles.logoWrap}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.logo}>FORGE</span>
        <div className={styles.logoMeta}>
          <span className={styles.badge}>AI</span>
          <span className={styles.version}>v2.0</span>
        </div>
      </motion.div>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Turn your skills into{' '}
        <em>remarkable projects</em>
      </motion.p>

      <motion.div
        className={styles.divider}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </header>
  )
}
