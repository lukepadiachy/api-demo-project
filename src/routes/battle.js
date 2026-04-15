const pokeapi = require('../services/pokeapi');
const { isValidType } = require('../utils/validators');

function calculateMultiplier(attackerType, defenderTypes) {
  let multiplier = 1;

  for (const defenderType of defenderTypes) {
    const effectiveness = getTypeEffectiveness(attackerType, defenderType);
    multiplier *= effectiveness;
  }

  return multiplier;
}

function getTypeEffectiveness(attackerData, defenderTypeName) {
  const relations = attackerData.damage_relations;

  if (relations.double_damage_to.some(t => t.name === defenderTypeName)) {
    return 2;
  }
  if (relations.half_damage_to.some(t => t.name === defenderTypeName)) {
    return 0.5;
  }
  if (relations.no_damage_to.some(t => t.name === defenderTypeName)) {
    return 0;
  }
  return 1;
}

function getEffectivenessText(multiplier) {
  if (multiplier === 0) return 'No Effect';
  if (multiplier === 0.25) return '4x Resisted';
  if (multiplier === 0.5) return 'Not Very Effective';
  if (multiplier === 1) return 'Neutral';
  if (multiplier === 2) return 'Super Effective';
  if (multiplier === 4) return '4x Super Effective';
  return 'Neutral';
}

async function calculateMatchup(req, res) {
  try {
    const { attacker, defender } = req.query;

    if (!attacker || !defender) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_PARAMETERS',
          message: "Both 'attacker' and 'defender' parameters are required"
        }
      });
    }

    const attackerLower = attacker.toLowerCase();
    const defenderTypes = defender.split(',').map(t => t.trim().toLowerCase());

    if (!isValidType(attackerLower)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TYPE',
          message: `Type '${attacker}' is not a valid Pokémon type`
        }
      });
    }

    for (const defenderType of defenderTypes) {
      if (!isValidType(defenderType)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_TYPE',
            message: `Type '${defenderType}' is not a valid Pokémon type`
          }
        });
      }
    }

    const attackerData = await pokeapi.getType(attackerLower);
    const multiplier = calculateMultiplier(attackerData, defenderTypes);
    const effectiveness = getEffectivenessText(multiplier);

    res.status(200).json({
      success: true,
      data: {
        attacker: attackerLower,
        defender: defenderTypes,
        multiplier,
        effectiveness
      }
    });
  } catch (error) {
    console.error('Error in calculateMatchup:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while calculating matchup'
      }
    });
  }
}

module.exports = {
  calculateMatchup
};
