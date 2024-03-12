// Components/Card/Card.tsx
import Link from 'next/link';
import styles from './card.module.css';
import Image from 'next/image';

export default function Card({ pokemonName, pokemonId }: {
  pokemonName: string | undefined
  pokemonId: string | undefined
}) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.placeholderImg}
          src="/pokemonPlaceholder.jpg"
          alt="Picture of the author"
          width={300}
          height={300}
        />
      </div>
      <div className={styles.pokemonName}>
        <Link href={`/${pokemonId}`}>
          {pokemonName}
        </Link>
      </div>
    </div>
  )
}
