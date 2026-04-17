const { getPokemon, getType } = require('./pokeapi');

const GENERATION_RANGES = {
  1: { min: 1, max: 151 },
  2: { min: 152, max: 251 },
  3: { min: 252, max: 386 },
  4: { min: 387, max: 493 },
  5: { min: 494, max: 649 },
  6: { min: 650, max: 721 },
  7: { min: 722, max: 809 },
  8: { min: 810, max: 905 },
  9: { min: 906, max: 1025 }
};

const MAX_POKEMON_ID = 1025;

function getPokemonIdsByGeneration(generation) {
  const gen = parseInt(generation);
  if (!GENERATION_RANGES[gen]) {
    const allIds = [];
    for (let id = 1; id <= MAX_POKEMON_ID; id++) {
      allIds.push(id);
    }
    return allIds;
  }
  
  const { min, max } = GENERATION_RANGES[gen];
  const ids = [];
  for (let id = min; id <= max; id++) {
    ids.push(id);
  }
  return ids;
}

async function getPokemonIdsByType(type) {
  const typeLower = type.toLowerCase();
  const typeData = await getType(typeLower);
  
  if (!typeData || !typeData.pokemon) {
    return [];
  }
  
  return typeData.pokemon
    .map(p => {
      const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop());
      return id;
    })
    .filter(id => id <= MAX_POKEMON_ID);
}

async function filterByMinStats(pokemonIds, minStats) {
  const minStatTotal = parseInt(minStats);
  const filtered = [];

  for (const id of pokemonIds) {
    try {
      const details = await getPokemon(id.toString());
      if (details && details.stats) {
        const totalStats = details.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
        if (totalStats >= minStatTotal) {
          filtered.push(id);
        }
      }
    } catch (error) {
      continue;
    }
  }

  return filtered;
}

function selectRandomId(ids) {
  if (ids.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}

async function getRandomPokemon(filters = {}) {
  const { type, generation, minStats } = filters;

  let pokemonIds;

  if (type) {
    pokemonIds = await getPokemonIdsByType(type);
    if (pokemonIds.length === 0) {
      return null;
    }
  } else {
    pokemonIds = getPokemonIdsByGeneration(generation);
  }

  if (generation && type) {
    const genIds = getPokemonIdsByGeneration(generation);
    pokemonIds = pokemonIds.filter(id => genIds.includes(id));
  }

  if (minStats) {
    pokemonIds = await filterByMinStats(pokemonIds, minStats);
  }

  const selectedId = selectRandomId(pokemonIds);
  
  if (!selectedId) {
    return null;
  }

  const details = await getPokemon(selectedId.toString());
  
  if (!details) {
    return null;
  }

  return details;
}

module.exports = {
  getRandomPokemon,
  GENERATION_RANGES
};
