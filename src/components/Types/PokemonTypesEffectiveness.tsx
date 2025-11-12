import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { PokemonDetails } from "../../types/PokemonDetails";
import { calculateEffectiveness } from "../../utils/calculatePokemonEffectiveness";
import { firstCharToUpper } from "../../utils/helpers";

function PokemonTypesEffectiveness({ pokemonDetails }: { pokemonDetails: PokemonDetails }) {
  const [weakData, setWeakData] = useState<any>(null);

  useEffect(() => {
    if (!pokemonDetails) return;
    calculateEffectiveness(pokemonDetails).then(setWeakData);
  }, [pokemonDetails]);

  if (!weakData) return <p>Calculating weaknesses...</p>;

  const renderLinks = (types: string[]) => {
    if (!types || types.length === 0) return <span>None</span>;
    return types.map((type) => (
      <Link
        key={type}
        to={`/types/${type}`}
        style={{ marginRight: "8px", display: "inline-block" }}
      >
        {firstCharToUpper(type)}
      </Link>
    ));
  };

  return (
    <div>
      <h3>Weaknesses</h3>
      {renderLinks(weakData.weaknesses)}

      <h3>Resistances</h3>
      {renderLinks(weakData.resistances)}

      <h3>Immunities</h3>
      {renderLinks(weakData.immunities)}
    </div>
  );
}

export default PokemonTypesEffectiveness;
