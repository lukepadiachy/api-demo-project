const { getRandomPokemon, GENERATION_RANGES } = require('../services/randomEncounter');
const { isValidType } = require('../utils/validators');

function validateFilters(query) {
  const { type, generation, minStats } = query;

  if (type !== undefined) {
    if (!isValidType(type)) {
      return {
        valid: false,
        code: 'INVALID_TYPE',
        message: `Invalid type '${type}'. Must be a valid Pokémon type.`
      };
    }
  }

  if (generation !== undefined) {
    const gen = parseInt(generation);
    if (isNaN(gen) || gen < 1 || gen > 9) {
      return {
        valid: false,
        code: 'INVALID_GENERATION',
        message: 'Generation must be between 1 and 9'
      };
    }
  }

  if (minStats !== undefined) {
    const stats = parseInt(minStats);
    if (isNaN(stats) || stats < 0) {
      return {
        valid: false,
        code: 'INVALID_MIN_STATS',
        message: 'Minimum stats must be a positive number'
      };
    }
  }

  return { valid: true };
}

async function randomEncounter(req, res) {
  try {
    const validation = validateFilters(req.query);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: validation.code,
          message: validation.message
        }
      });
    }

    const filters = {
      type: req.query.type,
      generation: req.query.generation,
      minStats: req.query.minStats
    };

    const pokemon = await getRandomPokemon(filters);

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NO_MATCHES',
          message: 'No Pokémon found matching the specified filters'
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
    console.error('Error in randomEncounter:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while generating random encounter'
      }
    });
  }
}

module.exports = randomEncounter;
