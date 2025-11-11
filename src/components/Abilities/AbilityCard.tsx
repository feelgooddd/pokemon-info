import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { removeHyphen, firstCharToUpper } from "../../utils/helpers";

interface PokemonSummary {
  pokemon: { name: string; url: string };
  is_hidden: boolean;
}

interface AbilityDetails {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
  pokemon: PokemonSummary[];
}

function AbilityCard() {
  const { name } = useParams<{ name: string }>();
  const [ability, setAbility] = useState<AbilityDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbility = async () => {
      if (!name) return;
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
        const data: AbilityDetails = await res.json();
        setAbility(data);
      } catch (err) {
        console.error("Failed to fetch ability:", err);
        setAbility(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAbility();
  }, [name]);

  if (loading) return <p>Loading ability...</p>;
  if (!ability) return <p>Ability not found.</p>;

  return (
    <div style={{ padding: "16px" }}>
      {name && <h2>{firstCharToUpper(removeHyphen(name))}</h2>}
      <p>
        {ability.effect_entries.find((e) => e.language.name === "en")?.effect ||
          "No description available."}
      </p>

      <h3>Pokémon with this ability:</h3>
      <div>
        {ability.pokemon.map((p) => (
          <Link
            key={p.pokemon.name}
            to={`/pokemon/${p.pokemon.name}`}
            style={{ display: "block", marginBottom: "4px" }}
          >
            {p.pokemon.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AbilityCard;
