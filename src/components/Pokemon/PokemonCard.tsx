import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchPokemon } from "../../utils/fetchers";
import type { PokemonDetails } from "../../types/PokemonDetails";
import PokemonAbilities from "./PokemonAbilities";
import { firstCharToUpper, weightInLbs, heightInFtIn } from "../../utils/helpers";
import PokemonTypes from "./PokemonTypes";
import PokemonStats from "./PokemonStats";
import PokemonTypesEffectiveness from "../Types/PokemonTypesEffectiveness";

function PokemonCard() {
  const { id } = useParams();
  const location = useLocation();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    location.state || null
  );
  const [loading, setLoading] = useState(!location.state);

useEffect(() => {
  const loadPokemon = async () => {
    try {
      const data =
        (location.state as PokemonDetails) || (await fetchPokemon(id!));
      setPokemonDetails(data);
    } catch (err) {
      console.error("Failed to fetch Pokémon:", err);
      setPokemonDetails(null);
    } finally {
      setLoading(false);
    }
  };

  loadPokemon();
}, [id, location.state]);


  console.log(id);

  if (loading) return <p>Loading Pokémon...</p>;
  if (!pokemonDetails) return <p>Pokémon not found.</p>;

  const { feet, inches } = heightInFtIn(pokemonDetails.height);

  return (
    <div
      style={{ border: "1px solid gray", padding: "16px", marginTop: "16px" }}
    >
      <h2>{firstCharToUpper(pokemonDetails.name)}</h2>
      <div className="pokemon-images">
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      <img
        src={pokemonDetails.sprites.front_shiny}
        alt={pokemonDetails.name}
      />
      </div>

      <p>
        Height:{" "}
        {feet > 0 ? (
          <>
            {feet}ft {inches}in
          </>
        ) : (
          <>{inches}inches</>
        )}
      </p>
      <p>Weight: {weightInLbs(pokemonDetails.weight)} lbs</p>

      <PokemonAbilities pokemonDetails={pokemonDetails} />
      <PokemonTypesEffectiveness pokemonDetails={pokemonDetails} />

      <PokemonTypes pokemonDetails={pokemonDetails} />
      <PokemonStats pokemonDetails={pokemonDetails} />
    </div>
  );
}

export default PokemonCard;
