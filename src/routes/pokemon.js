const pokeapi = require('../services/pokeapi');
const { validatePaginationParams, isValidPokemonIdentifier, validateSearchTerm } = require('../utils/validators');

async function listPokemon(req, res) {
  try {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;

    const validation = validatePaginationParams(limit, offset);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_PARAMETERS',
          message: validation.error
        }
      });
    }

    const result = await pokeapi.getPokemonList(validation.limit, validation.offset);

    res.status(200).json({
      success: true,
      data: result.results,
      pagination: {
        limit: validation.limit,
        offset: validation.offset,
        total: result.count
      }
    });
  } catch (error) {
    console.error('Error in listPokemon:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching Pokémon list'
      }
    });
  }
}

async function getPokemon(req, res) {
  try {
    const { identifier } = req.params;

    if (!isValidPokemonIdentifier(identifier)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_IDENTIFIER',
          message: `Invalid Pokémon identifier format: '${identifier}'`
        }
      });
    }

    const pokemon = await pokeapi.getPokemon(identifier);

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POKEMON_NOT_FOUND',
          message: `Pokemon with identifier '${identifier}' not found`
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types,
        abilities: pokemon.abilities,
        stats: pokemon.stats.map(stat => ({
          base_stat: stat.base_stat,
          stat: {
            name: stat.stat.name
          }
        })),
        sprites: {
          front_default: pokemon.sprites.front_default
        }
      }
    });
  } catch (error) {
    console.error('Error in getPokemon:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching Pokémon details'
      }
    });
  }
}

async function searchPokemon(req, res) {
  try {
    const searchTerm = req.query.name;
    const limit = parseInt(req.query.limit) || 10;
    const maxLimit = Math.min(limit, 50);

    const validation = validateSearchTerm(searchTerm);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: validation.code,
          message: validation.message
        }
      });
    }

    const allPokemon = await pokeapi.getAllPokemonNames();
    const searchLower = searchTerm.toLowerCase();
    
    const matches = allPokemon
      .filter(p => p.name.toLowerCase().includes(searchLower))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, maxLimit);

    res.status(200).json({
      success: true,
      data: matches,
      count: matches.length
    });
  } catch (error) {
    console.error('Error in searchPokemon:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while searching Pokémon'
      }
    });
  }
}

module.exports = {
  listPokemon,
  getPokemon,
  searchPokemon
};
