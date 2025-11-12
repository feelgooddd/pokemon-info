import { Outlet } from "react-router-dom"; // must be from react-router-dom
import SearchPokemon from "../components/SearchPokemon";
import type { PokemonDetails } from "../types/PokemonDetails";

interface MainLayoutProps {
  pokemon: string;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setPokemonDetails: React.Dispatch<React.SetStateAction<PokemonDetails | null>>;
}

function MainLayout({ pokemon, setPokemon, setPokemonDetails }: MainLayoutProps) {
  return (
    <div>
      {/* Global search bar */}
      <SearchPokemon
        pokemon={pokemon}
        setPokemon={setPokemon}
        setPokemonDetails={setPokemonDetails}
      />

      {/* Page content */}
      <Outlet />

      {/* Temporary Foot */}
      <footer style={{ width: "fit-content", marginInline: "auto"}}> Ryan Goods 2025</footer>
    </div>
  );
}

export default MainLayout;
