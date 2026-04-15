const pokeapi = require('../services/pokeapi');
const { isValidType } = require('../utils/validators');

async function listTypes(req, res) {
  try {
    const types = await pokeapi.getTypes();

    res.status(200).json({
      success: true,
      data: types,
      count: types.length
    });
  } catch (error) {
    console.error('Error in listTypes:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching types'
      }
    });
  }
}

async function getTypeDetails(req, res) {
  try {
    const { typeName } = req.params;
    const lowerTypeName = typeName.toLowerCase();

    if (!isValidType(lowerTypeName)) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TYPE_NOT_FOUND',
          message: `Type '${typeName}' not found`
        }
      });
    }

    const typeData = await pokeapi.getType(lowerTypeName);

    if (!typeData) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TYPE_NOT_FOUND',
          message: `Type '${typeName}' not found`
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: typeData.id,
        name: typeData.name,
        damageRelations: {
          doubleDamageFrom: typeData.damage_relations.double_damage_from.map(t => ({ name: t.name })),
          doubleDamageTo: typeData.damage_relations.double_damage_to.map(t => ({ name: t.name })),
          halfDamageFrom: typeData.damage_relations.half_damage_from.map(t => ({ name: t.name })),
          halfDamageTo: typeData.damage_relations.half_damage_to.map(t => ({ name: t.name })),
          noDamageFrom: typeData.damage_relations.no_damage_from.map(t => ({ name: t.name })),
          noDamageTo: typeData.damage_relations.no_damage_to.map(t => ({ name: t.name }))
        }
      }
    });
  } catch (error) {
    console.error('Error in getTypeDetails:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while fetching type details'
      }
    });
  }
}

module.exports = {
  listTypes,
  getTypeDetails
};
