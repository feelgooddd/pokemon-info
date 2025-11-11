import { Link } from "react-router-dom";
import type { PokemonDetails } from "../../types/PokemonDetails";
import { firstCharToUpper } from "../../utils/helpers";

interface PokemonAbilitiesProps {
  pokemonDetails: PokemonDetails;
}

function PokemonAbilities({ pokemonDetails }: PokemonAbilitiesProps) {
  return (
    <div>
      <h3>Abilities</h3>
      {pokemonDetails.abilities.map((a) => (
        <div key={a.ability.name}>
          <p>
            Name:{" "}
            <Link
              to={`/ability/${a.ability.name}`}
              state={{ url: a.ability.url }} // pass the API URL as route state
            >
              {firstCharToUpper(a.ability.name.replace("-", " "))}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export default PokemonAbilities;
