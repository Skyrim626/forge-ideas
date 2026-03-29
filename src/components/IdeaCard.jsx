import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './IdeaCard.module.css'

const CATEGORY_COLORS = {
  Tool: '#00d4ff',
  SaaS: '#c8ff00',
  'Open Source': '#a78bfa',
  Mobile: '#fb923c',
  AI: '#f472b6',
  Game: '#34d399',
  API: '#60a5fa',
  Platform: '#fbbf24',
}

const DIFFICULTY_LABELS = {
  Beginner: { color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' },
  Intermediate: { color: '#c8ff00', bg: 'rgba(200,255,0,0.08)', border: 'rgba(200,255,0,0.25)' },
  Advanced: { color: '#ff4d6d', bg: 'rgba(255,77,109,0.1)', border: 'rgba(255,77,109,0.25)' },
}

export default function IdeaCard({ idea, index }) {
  const [open, setOpen] = useState(false)

  const catColor = CATEGORY_COLORS[idea.category] || '#9494b0'
  const diff = DIFFICULTY_LABELS[idea.difficulty] || DIFFICULTY_LABELS['Intermediate']

  return (
    <motion.div
      className={`${styles.card} ${open ? styles.cardOpen : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      {/* Header row */}
      <button className={styles.header} onClick={() => setOpen((o) => !o)}>
        <span className={styles.num} style={{ opacity: open ? 1 : 0.2 }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.titleWrap}>
          <div className={styles.titleRow}>
            <span className={styles.name}>{idea.name}</span>
            <span
              className={styles.catBadge}
              style={{ color: catColor, borderColor: `${catColor}40`, background: `${catColor}12` }}
            >
              {idea.category}
            </span>
          </div>
          <span className={styles.tagline}>{idea.tagline}</span>
        </div>

        <span
          className={styles.diffBadge}
          style={{ color: diff.color, background: diff.bg, borderColor: diff.border }}
        >
          {idea.difficulty}
        </span>

        <motion.span
          className={styles.chevron}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ›
        </motion.span>
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.body}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.bodyInner}>
              <p className={styles.desc}>{idea.description}</p>

              <div className={styles.cols}>
                <div>
                  <p className={styles.sectionLabel}>Key Features</p>
                  <ul className={styles.featureList}>
                    {idea.features?.map((f, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureArrow}>→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.rightCol}>
                  <div className={styles.wowBox}>
                    <p className={styles.sectionLabel}>✦ Wow Factor</p>
                    <p className={styles.wowText}>{idea.wow}</p>
                  </div>

                  <div>
                    <p className={styles.sectionLabel}>Monetization</p>
                    <p className={styles.monoText}>{idea.monetization}</p>
                  </div>
                </div>
              </div>

              <div className={styles.techRow}>
                {idea.techStack?.map((t) => (
                  <span key={t} className={styles.techPill}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
