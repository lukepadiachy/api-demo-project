# TICKET-002: List Pokémon Endpoint

**Type**: Feature  
**Priority**: High  
**Status**: Ready for Development

## Description

Create an endpoint to retrieve a paginated list of Pokémon from the PokéAPI. This endpoint should support pagination to handle the large dataset efficiently.

## Endpoint Specification

- **Method**: `GET`
- **Path**: `/api/pokemon`
- **Query Parameters**:
  - `limit` (optional): Number of results per page (default: 20, max: 100)
  - `offset` (optional): Number of results to skip (default: 0)
- **Authentication**: None required

## Acceptance Criteria

### AC1: Successful Pokémon List Retrieval
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon`  
**Then** the response should:
- Return HTTP status code `200`
- Have `Content-Type: application/json`
- Include a `success` field with value `true`
- Include a `data` array containing Pokémon objects
- Include a `pagination` object with `limit`, `offset`, and `total` fields

**Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "id": 2,
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 1025
  }
}
```

### AC2: Custom Pagination
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon?limit=5&offset=10`  
**Then** the response should:
- Return exactly 5 Pokémon
- Start from the 11th Pokémon (offset 10)
- Reflect `limit=5` and `offset=10` in the pagination object

### AC3: Limit Validation
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon?limit=150`  
**Then** the response should:
- Cap the limit at 100 (max allowed)
- Return pagination with `limit: 100`

### AC4: Invalid Pagination Parameters
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon?limit=-5` or `offset=-10`  
**Then** the response should:
- Return HTTP status code `400`
- Include an error message indicating invalid parameters

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Limit and offset must be non-negative integers"
  }
}
```

### AC5: Data Source
**Given** the endpoint is called  
**When** data is fetched  
**Then** it should retrieve data from `https://pokeapi.co/api/v2/pokemon`

### AC6: Response Time
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon`  
**Then** the response time should be less than 2000ms (first call, uncached)

## Technical Notes

- Use PokéAPI endpoint: `https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}`
- Consider implementing caching for improved performance
- Default limit should be 20 items
- Maximum limit should be 100 items

## Validation

To test this ticket:
```bash
# Default pagination
curl -X GET http://localhost:3000/api/pokemon

# Custom pagination
curl -X GET "http://localhost:3000/api/pokemon?limit=10&offset=20"

# Invalid parameters
curl -X GET "http://localhost:3000/api/pokemon?limit=-5"
```

Expected:
- AC1: 200 status, data array with pokemon
- AC2: 5 results starting from offset 10
- AC3: Max 100 items
- AC4: 400 error for invalid params

---

**Created**: 2026-04-15  
**Assigned**: Development Team
