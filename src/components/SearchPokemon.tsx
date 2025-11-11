import { useNavigate } from "react-router-dom";
import type { PokemonDetails } from "../types/PokemonDetails";
import { fetchPokemon } from "../utils/fetchers";

interface SearchPokemonProps {
  pokemon: string;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setPokemonDetails: React.Dispatch<React.SetStateAction<PokemonDetails | null>>;
}

function SearchPokemon({ pokemon, setPokemon, setPokemonDetails }: SearchPokemonProps) {
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const data: PokemonDetails = await fetchPokemon(pokemon);
      setPokemonDetails(data); // update App state
      navigate(`/pokemon/${data.name}`, { state: data }); // navigate with route param & state
      setPokemon("")
    } catch (err) {
      console.error(err);
      alert("Pokémon not found!");
      setPokemonDetails(null);
    }
  };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-area">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} style={{ marginLeft: "8px" }}>
        Search
      </button>
    </div>
  );
}

export default SearchPokemon;
