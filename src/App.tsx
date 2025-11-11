import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { PokemonDetails } from "./types/PokemonDetails";
import MainLayout from "./layout/MainLayout";
import PokemonCard from "./components/Pokemon/PokemonCard";
import AbilityCard from "./components/Abilities/AbilityCard";
import PokemonTypesCard from "./components/Types/PokemonTypesCard";
import PokemonTypes from "./components/Pokemon/PokemonTypes";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  console.log(pokemonDetails);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout
              pokemon={pokemon}
              setPokemon={setPokemon}
              setPokemonDetails={setPokemonDetails}
            />
          }
        >
          <Route
            path="/"
            element={<div>Welcome! Search a Pokémon above.</div>}
          />
          <Route path="/pokemon/:id" element={<PokemonCard />} />
          <Route path="/ability/:name" element={<AbilityCard />} />
          <Route path="/types/:type" element={<PokemonTypesCard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
