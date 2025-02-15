import styles from './page.module.css'
import { fetchCollections } from './actions/firebaseActions'
import { fetchEntries } from './actions/contentfulActions'

export default async function Home() {
  const allEntries = await fetchEntries()
  // console.log(allEntries)
  const firestoreEntries = await fetchCollections()
  return (
    <div className={styles.page}>
      <main className={styles.main}>Main Content</main>
      <footer className={styles.footer}>Footer content</footer>
    </div>
  )
}
