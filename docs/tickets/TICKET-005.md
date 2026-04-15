# TICKET-005: List All Types

**Type**: Feature  
**Priority**: Medium  
**Status**: Ready for Development

## Description

Create an endpoint to retrieve a list of all Pokémon types (e.g., Fire, Water, Electric). Types are fundamental to the Pokémon battle system and are relatively static data.

## Endpoint Specification

- **Method**: `GET`
- **Path**: `/api/types`
- **Authentication**: None required

## Acceptance Criteria

### AC1: Successful Type List Retrieval
**Given** the API server is running  
**When** a GET request is made to `/api/types`  
**Then** the response should:
- Return HTTP status code `200`
- Include `success: true`
- Include a `data` array containing all type objects
- Include a `count` field with total number of types

**Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "normal",
      "url": "https://pokeapi.co/api/v2/type/1/"
    },
    {
      "id": 2,
      "name": "fighting",
      "url": "https://pokeapi.co/api/v2/type/2/"
    },
    {
      "id": 10,
      "name": "fire",
      "url": "https://pokeapi.co/api/v2/type/10/"
    }
  ],
  "count": 18
}
```

### AC2: All Standard Types Included
**Given** the API server is running  
**When** a GET request is made to `/api/types`  
**Then** the response should include all 18 standard types:
- normal, fighting, flying, poison, ground, rock, bug, ghost, steel
- fire, water, grass, electric, psychic, ice, dragon, dark, fairy

### AC3: Response Time (Cached)
**Given** types data has been cached  
**When** a GET request is made to `/api/types`  
**Then** the response time should be less than 100ms

### AC4: Response Time (Uncached)
**Given** types data has not been cached  
**When** a GET request is made to `/api/types`  
**Then** the response time should be less than 2000ms

### AC5: Data Source
**Given** the endpoint is called  
**When** data is fetched  
**Then** it should retrieve types from `https://pokeapi.co/api/v2/type`

## Technical Notes

- Use PokéAPI endpoint: `https://pokeapi.co/api/v2/type`
- **Strongly recommend caching** - types rarely change
- Cache TTL: 24 hours or more
- Should return exactly 18 types (excluding special types like "unknown" or "shadow")
- Filter out non-standard types if present in PokéAPI response

## Validation

To test this ticket:
```bash
# Get all types
curl -X GET http://localhost:3000/api/types
```

Expected:
- AC1: 200 status, array with type objects
- AC2: Exactly 18 standard types
- AC3/AC4: Response time validated

---

**Created**: 2026-04-15  
**Assigned**: Development Team
