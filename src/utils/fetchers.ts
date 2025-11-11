const BASEURL = "https://pokeapi.co/api/v2/";
import type { PokemonDetails } from "../types/PokemonDetails";

export async function fetchPokemon(pokename: string): Promise<PokemonDetails> {
  const response = await fetch(`${BASEURL}pokemon/${pokename.toLowerCase()}`);
  if (!response.ok) {
    throw new Error("Pokémon not found");
  }
const data = (await response.json()) as PokemonDetails;
  return data;
}

export async function fetchAbility(urlOrName: string) {
  const abilityUrl = urlOrName.startsWith("http")
    ? urlOrName
    : `${BASEURL}ability/${urlOrName.toLowerCase()}`;

  const response = await fetch(abilityUrl);
  if (!response.ok) throw new Error("Ability not found");
  return await response.json();
}