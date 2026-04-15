const VALID_TYPES = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
  'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

function isValidPokemonIdentifier(identifier) {
  if (!identifier) return false;
  
  if (/^\d+$/.test(identifier)) {
    return true;
  }
  
  return /^[a-z0-9\-]+$/i.test(identifier);
}

function isValidType(typeName) {
  return VALID_TYPES.includes(typeName.toLowerCase());
}

function validatePaginationParams(limit, offset) {
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
    return { valid: false, error: 'Limit and offset must be valid integers' };
  }

  if (parsedLimit < 0 || parsedOffset < 0) {
    return { valid: false, error: 'Limit and offset must be non-negative integers' };
  }

  return { 
    valid: true, 
    limit: Math.min(parsedLimit, 100),
    offset: parsedOffset 
  };
}

function validateSearchTerm(term) {
  if (!term) {
    return { valid: false, code: 'MISSING_PARAMETER', message: "Search parameter 'name' is required" };
  }

  if (term.length < 2) {
    return { valid: false, code: 'INVALID_SEARCH_TERM', message: 'Search term must be at least 2 characters long' };
  }

  return { valid: true };
}

module.exports = {
  isValidPokemonIdentifier,
  isValidType,
  validatePaginationParams,
  validateSearchTerm,
  VALID_TYPES
};
