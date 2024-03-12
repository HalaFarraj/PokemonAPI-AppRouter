import MainPage from './home';
import styles from './page.module.css'

export default async function Home() {

  const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=8');
  const data = await response.json();

  return (
    <main className={styles.pageWrapper}>
      <MainPage data={data} />
    </main>
  );
}
