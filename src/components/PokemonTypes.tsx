import type { PokemonDetails } from "../types/PokemonDetails";
import { firstCharToUpper, removeHyphen } from "../utils/helpers";

interface PokemonAbilitiesProps {
  pokemonDetails: PokemonDetails;
}

function PokemonTypes({ pokemonDetails }: PokemonAbilitiesProps) {
  return (
    <div>
      <h3>{pokemonDetails.types.length > 1 ? "Types" : "Type"}</h3>
      {pokemonDetails.types.map((type) => (
        <div key={type.type.name}>
          <p>
            {firstCharToUpper(removeHyphen(type.type.name))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PokemonTypes;
