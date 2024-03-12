"use client"

import Card from "@/Components/Card/card";
import styles from './page.module.css'
import { useState, useEffect } from 'react';

function getPokemonID(uri: string) {
  const idPart = (uri.split('/').slice(-2)[0]);
  const pokemonID = idPart.match(/\d+/)?.[0];
  return pokemonID;
}

export default function MainPage({ data }: any) {
  const [pokemonData, setPokemonData] = useState<
    {
      count: number,
      next: string | null,
      previous: string | null
      results:
      { name: string, url: string }[]
    }
    | null>(data);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)



  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemonData(data);
      setNextUrl(data?.next);
      setPrevUrl(data?.previous);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=8');
  }, []);

  const handleNext = () => {
    if (nextUrl) {
      fetchData(nextUrl);
      setPageNumber((prevNumber) => prevNumber + 1)
    }
  };

  const handlePrev = () => {
    if (prevUrl) {
      fetchData(prevUrl);
      setPageNumber((prevNumber) => prevNumber - 1)
    }
  };

  return (
    <>
      <div className={styles.gridWrapper}>
        {
          pokemonData?.results?.map(
            (item: { name: string, url: string }, index: number) => {
              const id = getPokemonID(item?.url)
              return (<Card key={item?.name + index} pokemonName={item?.name} pokemonId={id} />)
            }
          )
        }
      </div>
      <div className={styles.indicatorsWrapper} >
        {
          <button
            className="button"
            type="button"
            disabled={prevUrl === null}
            onClick={handlePrev}
          >Previous </button>}
        <h4>{pageNumber}</h4>
        <button
          className="button"
          type="button"
          disabled={nextUrl === null}
          onClick={handleNext}
        >Next</button>
      </div>
    </>
  );
}
