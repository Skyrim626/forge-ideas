import BgGrid from "./components/BgGrid";
import Header from "./components/Header";
import ConfigForm from "./components/ConfigForm";
import IdeaList from "./components/IdeaList";
import { useIdeaGenerator } from "./hooks/useIdeaGenerator";
import styles from "./App.module.css";

export default function App() {
  const { ideas, loading, error, generated, generate } = useIdeaGenerator();

  return (
    <>
      <BgGrid />
      <div className={styles.layout}>
        <div className={styles.container}>
          <Header />
          <ConfigForm onGenerate={generate} loading={loading} />
          <IdeaList ideas={ideas} error={error} generated={generated} />

          <footer className={styles.footer}>
            <span>Powered by</span>
            <span className={styles.footerAccent}>Claude Sonnet</span>
            <span className={styles.footerDot}>·</span>
            <span>Built with React + Vite</span>
          </footer>
        </div>
      </div>
    </>
  );
}
