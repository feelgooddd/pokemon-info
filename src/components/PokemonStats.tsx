import type { PokemonDetails } from "../types/PokemonDetails";
import { removeHyphen, firstCharToUpper } from "../utils/helpers";
interface PokemonStatsProps {
  pokemonDetails: PokemonDetails;
}

function PokemonStats({ pokemonDetails }: PokemonStatsProps) {
  return (
    <div>

      <h3>Base Stats</h3>
      {pokemonDetails.stats.map((stat) => (
        <p key={stat.stat.name}>
          <strong>{firstCharToUpper( removeHyphen(stat.stat.name))}</strong>: {stat.base_stat}
        </p>
      ))}

      <h3> EVs given for defeating</h3>
      {pokemonDetails.stats
        .filter((stat) => stat.effort !== 0)
        .map((stat) => (
          <p key={stat.stat.name}>
            <strong>{removeHyphen(stat.stat.name)}</strong>: {stat.effort}
          </p>
        ))}

    </div>
  );
}

export default PokemonStats;
