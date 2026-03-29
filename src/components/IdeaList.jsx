import { motion, AnimatePresence } from 'framer-motion'
import IdeaCard from './IdeaCard'
import styles from './IdeaList.module.css'

export default function IdeaList({ ideas, error, generated }) {
  if (error) {
    return (
      <motion.div
        className={styles.errorBox}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.errorIcon}>⚠</span>
        <div>
          <p className={styles.errorTitle}>Generation failed</p>
          <p className={styles.errorMsg}>{error}</p>
        </div>
      </motion.div>
    )
  }

  if (!generated) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyGlyph}>◈</div>
        <p className={styles.emptyText}>Configure your preferences and hit Generate</p>
        <p className={styles.emptyHint}>Claude will produce 5 tailored project ideas for you</p>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.resultsHeader}>
        <span className={styles.resultsLabel}>{ideas.length} ideas generated</span>
        <div className={styles.resultsLine} />
      </div>

      <motion.div className={styles.list} layout>
        <AnimatePresence>
          {ideas.map((idea, i) => (
            <IdeaCard key={idea.name + i} idea={idea} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
