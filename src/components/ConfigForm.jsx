import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ConfigForm.module.css'

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Data Scientist',
  'ML Engineer',
  'Mobile Developer',
  'DevOps Engineer',
  'Student / Beginner',
]

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'Mixed']

const DOMAIN_OPTIONS = [
  { label: 'Dev Tools', value: 'developer tools' },
  { label: 'AI / ML', value: 'AI and machine learning' },
  { label: 'SaaS', value: 'SaaS products' },
  { label: 'Productivity', value: 'productivity' },
  { label: 'Finance', value: 'fintech / finance' },
  { label: 'Health', value: 'health and fitness' },
  { label: 'Education', value: 'education' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'Social', value: 'social / community' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Open Source', value: 'open source tooling' },
  { label: 'Climate', value: 'climate and sustainability' },
]

export default function ConfigForm({ onGenerate, loading }) {
  const [role, setRole] = useState('Fullstack Developer')
  const [difficulty, setDifficulty] = useState('Intermediate')
  const [domains, setDomains] = useState(['developer tools', 'SaaS products'])
  const [stack, setStack] = useState('')
  const [notes, setNotes] = useState('')

  const toggleDomain = (val) => {
    setDomains((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (domains.length === 0) return
    onGenerate({ role, difficulty, domains, stack, notes })
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>Role</label>
          <select
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Difficulty</label>
          <div className={styles.pills}>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                className={`${styles.pill} ${difficulty === d ? styles.pillActive : ''}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>
            Domains{' '}
            <span className={styles.labelHint}>pick at least one</span>
          </label>
          <div className={styles.tags}>
            {DOMAIN_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`${styles.tag} ${domains.includes(value) ? styles.tagActive : ''}`}
                onClick={() => toggleDomain(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>
            Tech Stack <span className={styles.labelHint}>optional</span>
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. React, Node.js, PostgreSQL, Supabase..."
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          />
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>
            Context / Constraints <span className={styles.labelHint}>optional</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="e.g. I want something portfolio-worthy, or I'm interested in real-time features, or I have 2 weeks..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <motion.button
        className={styles.btnGenerate}
        type="submit"
        disabled={loading || domains.length === 0}
        whileHover={{ scale: loading ? 1 : 1.01 }}
        whileTap={{ scale: loading ? 1 : 0.99 }}
      >
        {loading ? (
          <span className={styles.loadingInner}>
            <span className={styles.spinner} />
            Generating ideas...
          </span>
        ) : (
          '⚡ Generate Project Ideas'
        )}
      </motion.button>

      {domains.length === 0 && (
        <p className={styles.warn}>Select at least one domain to continue</p>
      )}
    </motion.form>
  )
}
