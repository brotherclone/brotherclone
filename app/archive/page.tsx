import type { ArchiveEntry } from "@/lib/fourthwall";
import archiveData from "@/data/archive.json";
import styles from "./page.module.scss";

// Archive is static — only updates when the JSON file changes (via cron or manual)
export const revalidate = false;

export default function ArchivePage() {
  const entries = archiveData as ArchiveEntry[];
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className={styles["archive-page"]}>
      <header className={styles["archive-header"]}>
        <a href="/" className={styles["archive-header__back"]}>← brotherclone</a>
        <h1 className={styles["archive-header__title"]}>archive</h1>
      </header>

      {sorted.length === 0 ? (
        <p className={styles["archive-empty"]}>the archive is empty. the first drop hasn&apos;t happened yet.</p>
      ) : (
        <ol className={styles["archive-list"]}>
          {sorted.map((entry) => (
            <li key={entry.date} className={styles["archive-entry"]}>
              <time className={styles["archive-entry__date"]} dateTime={entry.date}>
                {entry.date}
              </time>
              <span className={styles["archive-entry__name"]}>{entry.product.name}</span>
              {entry.editorialNote && (
                <p className={styles["archive-entry__note"]}>{entry.editorialNote}</p>
              )}
              <span className={`${styles["archive-entry__mode"]} ${styles[`archive-entry__mode--${entry.product.mode}`]}`}>
                {entry.product.mode}
              </span>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
