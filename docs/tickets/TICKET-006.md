# TICKET-006: Get Type Details with Damage Relations

**Type**: Feature  
**Priority**: Medium  
**Status**: Ready for Development

## Description

Create an endpoint to retrieve detailed information about a specific Pokémon type, including damage relations (what it's strong/weak against). This is essential for battle strategy.

## Endpoint Specification

- **Method**: `GET`
- **Path**: `/api/types/:typeName`
- **Path Parameters**:
  - `typeName`: Name of the type (e.g., "fire", "water")
- **Authentication**: None required

## Acceptance Criteria

### AC1: Successful Type Details Retrieval
**Given** the API server is running  
**When** a GET request is made to `/api/types/fire`  
**Then** the response should:
- Return HTTP status code `200`
- Include `success: true`
- Include a `data` object with:
  - `id` (number)
  - `name` (string)
  - `damageRelations` object with arrays for:
    - `doubleDamageFrom` (types that deal 2x damage TO fire)
    - `doubleDamageTo` (types that fire deals 2x damage TO)
    - `halfDamageFrom` (types that deal 0.5x damage TO fire)
    - `halfDamageTo` (types that fire deals 0.5x damage TO)
    - `noDamageFrom` (types that deal 0x damage TO fire)
    - `noDamageTo` (types that fire deals 0x damage TO)

**Example Response**:
```json
{
  "success": true,
  "data": {
    "id": 10,
    "name": "fire",
    "damageRelations": {
      "doubleDamageFrom": [
        { "name": "water" },
        { "name": "ground" },
        { "name": "rock" }
      ],
      "doubleDamageTo": [
        { "name": "grass" },
        { "name": "ice" },
        { "name": "bug" },
        { "name": "steel" }
      ],
      "halfDamageFrom": [
        { "name": "fire" },
        { "name": "grass" },
        { "name": "ice" },
        { "name": "bug" },
        { "name": "steel" },
        { "name": "fairy" }
      ],
      "halfDamageTo": [
        { "name": "fire" },
        { "name": "water" },
        { "name": "rock" },
        { "name": "dragon" }
      ],
      "noDamageFrom": [],
      "noDamageTo": []
    }
  }
}
```

### AC2: Case-Insensitive Type Name
**Given** the API server is running  
**When** requests are made to `/api/types/FIRE` and `/api/types/fire`  
**Then** both should return identical results

### AC3: Type Not Found
**Given** the API server is running  
**When** a GET request is made to `/api/types/invalidtype`  
**Then** the response should:
- Return HTTP status code `404`
- Include an error message

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "TYPE_NOT_FOUND",
    "message": "Type 'invalidtype' not found"
  }
}
```

### AC4: Valid Type Names Only
**Given** the endpoint is called  
**When** checking for valid types  
**Then** only these 18 types should be accepted:
- normal, fighting, flying, poison, ground, rock, bug, ghost, steel
- fire, water, grass, electric, psychic, ice, dragon, dark, fairy

### AC5: Data Source
**Given** the endpoint is called  
**When** a valid type name is provided  
**Then** data should be fetched from `https://pokeapi.co/api/v2/type/{typeName}`

### AC6: Response Time
**Given** the API server is running  
**When** a GET request is made to `/api/types/fire`  
**Then** the response time should be less than 2000ms (uncached)

## Technical Notes

- Use PokéAPI endpoint: `https://pokeapi.co/api/v2/type/{name}/`
- Convert PokéAPI field names to camelCase for consistency:
  - `double_damage_from` → `doubleDamageFrom`
  - `double_damage_to` → `doubleDamageTo`
  - etc.
- Consider caching type details (they rarely change)
- Type names should be converted to lowercase before API call

## Validation

To test this ticket:
```bash
# Get fire type details
curl -X GET http://localhost:3000/api/types/fire

# Case insensitive
curl -X GET http://localhost:3000/api/types/WATER

# Invalid type
curl -X GET http://localhost:3000/api/types/invalidtype
```

Expected:
- AC1: Full damage relations for fire type
- AC2: Same data for different cases
- AC3: 404 error for invalid type

---

**Created**: 2026-04-15  
**Assigned**: Development Team
