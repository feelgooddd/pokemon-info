import type { PokemonDetails } from "../../types/PokemonDetails";
import { firstCharToUpper, removeHyphen } from "../../utils/helpers";
import { Link } from "react-router";
interface PokemonAbilitiesProps {
  pokemonDetails: PokemonDetails;
}

function PokemonTypes({ pokemonDetails }: PokemonAbilitiesProps) {
  return (
    <div>
      <h3>{pokemonDetails.types.length > 1 ? "Types" : "Type"}</h3>
      {pokemonDetails.types.map((type) => (
        <div key={type.type.name}>
          <Link to={`../../types/${type.type.name}`}>
            {firstCharToUpper(removeHyphen(type.type.name))}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PokemonTypes;
