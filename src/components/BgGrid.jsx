import styles from './BgGrid.module.css'

export default function BgGrid() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.glow1} />
      <div className={styles.glow2} />
    </div>
  )
}
