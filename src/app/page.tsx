import Image from "next/image";
import styles from "./page.module.css";
import { fetchEntries } from "./actions/fetchEntries";

export default async function Home() {

  const allEntries = await fetchEntries()

  console.log(allEntries);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Main Content
      </main>
      <footer className={styles.footer}>
        Footer content
      </footer>
    </div>
  );
}
