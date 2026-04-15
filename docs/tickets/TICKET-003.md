# TICKET-003: Get Single Pokémon Details

**Type**: Feature  
**Priority**: High  
**Status**: Ready for Development

## Description

Create an endpoint to retrieve detailed information about a specific Pokémon by ID or name. This should return comprehensive data including types, abilities, stats, and sprites.

## Endpoint Specification

- **Method**: `GET`
- **Path**: `/api/pokemon/:identifier`
- **Path Parameters**:
  - `identifier`: Pokémon ID (number) or name (string)
- **Authentication**: None required

## Acceptance Criteria

### AC1: Successful Retrieval by ID
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/25` (Pikachu's ID)  
**Then** the response should:
- Return HTTP status code `200`
- Include `success: true`
- Include a `data` object with Pokémon details:
  - `id` (number)
  - `name` (string)
  - `height` (number)
  - `weight` (number)
  - `types` (array of type objects)
  - `abilities` (array of ability objects)
  - `stats` (array of stat objects)
  - `sprites` (object with image URLs)

**Example Response**:
```json
{
  "success": true,
  "data": {
    "id": 25,
    "name": "pikachu",
    "height": 4,
    "weight": 60,
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "electric",
          "url": "https://pokeapi.co/api/v2/type/13/"
        }
      }
    ],
    "abilities": [
      {
        "ability": {
          "name": "static",
          "url": "https://pokeapi.co/api/v2/ability/9/"
        },
        "is_hidden": false,
        "slot": 1
      }
    ],
    "stats": [
      {
        "base_stat": 35,
        "stat": {
          "name": "hp"
        }
      }
    ],
    "sprites": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }
  }
}
```

### AC2: Successful Retrieval by Name
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/pikachu`  
**Then** the response should:
- Return HTTP status code `200`
- Return the same data as AC1
- Name lookup should be case-insensitive

### AC3: Pokémon Not Found
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/999999` (non-existent ID)  
**Then** the response should:
- Return HTTP status code `404`
- Include an error object

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "POKEMON_NOT_FOUND",
    "message": "Pokemon with identifier '999999' not found"
  }
}
```

### AC4: Invalid Identifier Format
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/invalid@name`  
**Then** the response should:
- Return HTTP status code `400`
- Include an error indicating invalid format

### AC5: Data Source
**Given** the endpoint is called  
**When** a valid identifier is provided  
**Then** data should be fetched from `https://pokeapi.co/api/v2/pokemon/{identifier}`

### AC6: Response Time
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/25`  
**Then** the response time should be less than 2000ms (uncached)

## Technical Notes

- Use PokéAPI endpoint: `https://pokeapi.co/api/v2/pokemon/{id_or_name}/`
- Both numeric IDs and string names should work
- Name matching should be case-insensitive
- Consider caching popular Pokémon
- Handle PokéAPI errors gracefully

## Validation

To test this ticket:
```bash
# Get by ID
curl -X GET http://localhost:3000/api/pokemon/25

# Get by name
curl -X GET http://localhost:3000/api/pokemon/pikachu

# Not found
curl -X GET http://localhost:3000/api/pokemon/999999

# Invalid format
curl -X GET http://localhost:3000/api/pokemon/invalid@name
```

Expected:
- AC1: Full Pikachu details
- AC2: Same data via name
- AC3: 404 error
- AC4: 400 error

---

**Created**: 2026-04-15  
**Assigned**: Development Team
