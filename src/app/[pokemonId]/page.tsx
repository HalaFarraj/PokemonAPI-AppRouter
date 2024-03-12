import styles from "./page.module.css"
import Image from 'next/image';

const fetchData = async (id?: string) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default async function PokemonDetailsPage({ params }: { params: { pokemonId: string } }) {
    const pokemonID = params.pokemonId;
    const pokemonData = await fetchData(pokemonID)

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.placeholderImg}
                    src="/pokemon2.jpg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className={styles.detailsWrapper}>
                <h3 className={styles.name}>
                    {pokemonData?.name}
                </h3>
                <div className={styles.row}>
                    <h3>Types: </h3>
                    {
                        pokemonData?.types?.map((item: any, index: number) => (
                            <p className={styles.tag} key={index}>{
                                item?.type?.name
                            }</p>
                        ))
                    }
                </div>
                <div className={styles.row}>
                    <h3>Abilities: </h3>
                    {
                        pokemonData?.abilities?.map((item: any, index: number) => (
                            <p className={styles.tag} key={index}>{
                                item?.ability?.name
                            }</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};