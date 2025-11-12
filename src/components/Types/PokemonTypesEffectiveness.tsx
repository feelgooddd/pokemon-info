import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { PokemonDetails } from "../../types/PokemonDetails";
import { calculateEffectiveness } from "../../utils/calculatePokemonEffectiveness";
import { firstCharToUpper } from "../../utils/helpers";

function PokemonTypesEffectiveness({
  pokemonDetails,
}: {
  pokemonDetails: PokemonDetails;
}) {
  const [weakData, setWeakData] = useState<any>(null);

  useEffect(() => {
    if (!pokemonDetails) return;
    calculateEffectiveness(pokemonDetails).then(setWeakData);
  }, [pokemonDetails]);

  if (!weakData) return <p>Calculating weaknesses...</p>;

  const renderLinks = (
    types: string[],
    multipliers: { [key: string]: number }
  ) => {
    if (!types || types.length === 0) return <span>None</span>;

    return types.map((type) => (
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
        <Link key={type} to={`/types/${type}` }>
          {firstCharToUpper(type)}
        </Link>
        {multipliers[type] > 0 ? <span> × {multipliers[type].toFixed(2)} </span>: ""}
      </div>
    ));
  };

  return (
    <div>
      <h3>Weaknesses</h3>
      {renderLinks(weakData.weaknesses, weakData.allMultipliers)}

      <h3>Resistances</h3>
      {renderLinks(weakData.resistances, weakData.allMultipliers)}

      <h3>Immunities</h3>
      {renderLinks(weakData.immunities, weakData.allMultipliers)}
    </div>
  );
}

export default PokemonTypesEffectiveness;
