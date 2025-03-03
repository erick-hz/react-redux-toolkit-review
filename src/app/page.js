"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "./redux/Slices/pokemonSlice";
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.pokemon);
  console.log("pokemon:", list);
  console.log("loading:", loading);
  console.log("error:", error);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const getCardClass = (pokemon) => {
    const firstType = pokemon.types[0]?.type.name;
    return styles[firstType] || "";
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.appTitle}>100 Pokémon</h1>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {error && <p className={styles.errorText}>Error: {error}</p>}
      <div className={styles.cards}>
        {list.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`${styles.card} ${getCardClass(pokemon)}`}
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className={styles.pokemonImage}
              width={96}
              height={96}
            />
            <p className={styles.pokemonInfo}>Height: {pokemon.height}</p>
            <p className={styles.pokemonInfo}>Weight: {pokemon.weight}</p>
            <p className={styles.pokemonInfo}>
              Types: {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
