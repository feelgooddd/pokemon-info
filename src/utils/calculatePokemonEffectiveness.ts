// utils/calculateWeaknesses.ts
import type { PokemonDetails } from "../types/PokemonDetails";

interface TypeMultiplier {
  [typeName: string]: number;
}

export interface PokemonEffectiveness {
  weaknesses: string[]; // multiplier > 1
  resistances: string[]; // multiplier < 1
  immunities: string[]; // multiplier === 0
  allMultipliers: TypeMultiplier; // optional: shows exact multipliers for each type
}

export async function calculateEffectiveness(pokemon: PokemonDetails): Promise<PokemonEffectiveness> {
  // Initialize all types with multiplier 1
  const allTypes = [
    "normal","fire","water","electric","grass","ice","fighting","poison","ground",
    "flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
  ];

  const typeMultipliers: TypeMultiplier = {};
  allTypes.forEach(t => typeMultipliers[t] = 1);

  // Fetch damage relations for each Pokémon type
  const responses = await Promise.all(
    pokemon.types.map(t => fetch(t.type.url).then(res => res.json()))
  );

  // Combine multipliers
  responses.forEach((type: any) => {
    type.damage_relations.double_damage_from.forEach((t: any) => {
      typeMultipliers[t.name] *= 2;
    });
    type.damage_relations.half_damage_from.forEach((t: any) => {
      typeMultipliers[t.name] *= 0.5;
    });
    type.damage_relations.no_damage_from.forEach((t: any) => {
      typeMultipliers[t.name] *= 0;
    });
  });

  const weaknesses = Object.entries(typeMultipliers)
    .filter(([_, multiplier]) => multiplier > 1)
    .map(([typeName]) => typeName);

  const resistances = Object.entries(typeMultipliers)
    .filter(([_, multiplier]) => multiplier > 0 && multiplier < 1)
    .map(([typeName]) => typeName);

  const immunities = Object.entries(typeMultipliers)
    .filter(([_, multiplier]) => multiplier === 0)
    .map(([typeName]) => typeName);

  return { weaknesses, resistances, immunities, allMultipliers: typeMultipliers };
}
