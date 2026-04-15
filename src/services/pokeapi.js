const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';
const cache = new Map();

const CACHE_TTL = {
  types: 24 * 60 * 60 * 1000,
  pokemon: 60 * 60 * 1000,
  default: 5 * 60 * 1000
};

function getCacheKey(endpoint) {
  return endpoint;
}

function isCacheValid(cacheEntry) {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < cacheEntry.ttl;
}

async function fetchWithCache(endpoint, ttl = CACHE_TTL.default) {
  const key = getCacheKey(endpoint);
  const cached = cache.get(key);

  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    cache.set(key, {
      data: response.data,
      timestamp: Date.now(),
      ttl
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getPokemonList(limit = 20, offset = 0) {
  const endpoint = `/pokemon?limit=${limit}&offset=${offset}`;
  const data = await fetchWithCache(endpoint, CACHE_TTL.default);
  
  const results = data.results.map(pokemon => {
    const id = parseInt(pokemon.url.split('/').filter(Boolean).pop());
    return {
      id,
      name: pokemon.name,
      url: pokemon.url
    };
  });

  return {
    results,
    count: data.count
  };
}

async function getPokemon(identifier) {
  const endpoint = `/pokemon/${identifier.toLowerCase()}`;
  return await fetchWithCache(endpoint, CACHE_TTL.pokemon);
}

async function getAllPokemonNames() {
  const endpoint = '/pokemon?limit=2000';
  const data = await fetchWithCache(endpoint, CACHE_TTL.types);
  
  return data.results.map(pokemon => {
    const id = parseInt(pokemon.url.split('/').filter(Boolean).pop());
    return {
      id,
      name: pokemon.name
    };
  });
}

async function getTypes() {
  const endpoint = '/type';
  const data = await fetchWithCache(endpoint, CACHE_TTL.types);
  
  const standardTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 
    'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
  ];
  
  const results = data.results
    .filter(type => standardTypes.includes(type.name))
    .map(type => {
      const id = parseInt(type.url.split('/').filter(Boolean).pop());
      return {
        id,
        name: type.name,
        url: type.url
      };
    });

  return results;
}

async function getType(typeName) {
  const endpoint = `/type/${typeName.toLowerCase()}`;
  return await fetchWithCache(endpoint, CACHE_TTL.types);
}

module.exports = {
  getPokemonList,
  getPokemon,
  getAllPokemonNames,
  getTypes,
  getType
};
