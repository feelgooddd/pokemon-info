import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { firstCharToUpper } from "../../utils/helpers";
import TypeRelationList from "../../types/TypeRelationList";
import Pagination from "../Pagination";
interface TypeDetails {
  damage_relations: {
    double_damage_from: { name: string }[];
    double_damage_to: { name: string }[];
    half_damage_from: { name: string }[];
    half_damage_to: { name: string }[];
    no_damage_from: { name: string }[];
    no_damage_to: { name: string }[];
  };
  pokemon: { pokemon: { name: string; url: string } }[];
}

function PokemonTypesCard() {
  const { type } = useParams<{ type: string }>();
  const location = useLocation();
  const { url } = (location.state as { url?: string }) || {};

  const [typeDetails, setTypeDetails] = useState<TypeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 10;

  useEffect(() => {
    async function fetchTypeDetails() {
      if (!type && !url) return;

      try {
        const fetchUrl = url || `https://pokeapi.co/api/v2/type/${type}`;
        const res = await fetch(fetchUrl);
        const data: TypeDetails = await res.json();
        setTypeDetails(data);
      } catch (err) {
        console.error("Failed to fetch type:", err);
        setTypeDetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTypeDetails();
  }, [url, type]);

  if (loading) return <p>Loading type...</p>;
  if (!typeDetails) return <p>Type not found.</p>;

  const { damage_relations, pokemon } = typeDetails;

  // Pagination logic
  const indexOfLast = currentPage * pokemonPerPage;
  const indexOfFirst = indexOfLast - pokemonPerPage;
  const currentPokemon = pokemon.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ padding: "16px" }}>
      <h2>{firstCharToUpper(type || "")} Type</h2>

      <section style={{ marginTop: "16px" }}>
        <h3>Damage Relations</h3>

        <TypeRelationList
          title="Strong against"
          types={damage_relations.double_damage_to}
        />
        <TypeRelationList
          title="Weakness to"
          types={damage_relations.double_damage_from}
        />
        <TypeRelationList
          title="Resists"
          types={damage_relations.half_damage_from}
        />
        <TypeRelationList
          title="Is resisted by"
          types={damage_relations.half_damage_to}
        />
        <TypeRelationList
          title="Has immunity from"
          types={damage_relations.no_damage_from}
        />
        <TypeRelationList
          title={`Immunity to ${type}`}
          types={damage_relations.no_damage_to}
        />
      </section>

      <section style={{ marginTop: "24px" }}>
        <h3>Pokémon with this type:</h3>
        {currentPokemon.map((p) => (
          <Link
            key={p.pokemon.name}
            to={`/pokemon/${p.pokemon.name}`}
            style={{ display: "block", marginBottom: "4px" }}
          >
            {p.pokemon.name}
          </Link>
        ))}

        {/*  Pagination controls */}
        <Pagination
          currentPage={currentPage}
          totalItems={pokemon.length}
          itemsPerPage={pokemonPerPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}

export default PokemonTypesCard;
