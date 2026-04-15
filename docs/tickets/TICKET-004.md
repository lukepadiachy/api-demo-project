# TICKET-004: Search Pokémon by Name

**Type**: Feature  
**Priority**: Medium  
**Status**: Ready for Development

## Description

Create an endpoint to search for Pokémon by name using partial matching. This allows users to find Pokémon without knowing the exact name.

## Endpoint Specification

- **Method**: `GET`
- **Path**: `/api/pokemon/search`
- **Query Parameters**:
  - `name` (required): Search term (minimum 2 characters)
  - `limit` (optional): Max results to return (default: 10, max: 50)
- **Authentication**: None required

## Acceptance Criteria

### AC1: Successful Search with Results
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/search?name=char`  
**Then** the response should:
- Return HTTP status code `200`
- Include `success: true`
- Include a `data` array with matching Pokémon (e.g., Charmander, Charizard, Charmeleon)
- Include a `count` field showing number of results

**Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 4,
      "name": "charmander"
    },
    {
      "id": 5,
      "name": "charmeleon"
    },
    {
      "id": 6,
      "name": "charizard"
    }
  ],
  "count": 3
}
```

### AC2: Search with No Results
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/search?name=xyz123`  
**Then** the response should:
- Return HTTP status code `200`
- Include `success: true`
- Include an empty `data` array
- Include `count: 0`

**Example Response**:
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

### AC3: Missing Search Term
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/search` (no name parameter)  
**Then** the response should:
- Return HTTP status code `400`
- Include an error message

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "Search parameter 'name' is required"
  }
}
```

### AC4: Search Term Too Short
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/search?name=p` (1 character)  
**Then** the response should:
- Return HTTP status code `400`
- Include an error message about minimum length

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_SEARCH_TERM",
    "message": "Search term must be at least 2 characters long"
  }
}
```

### AC5: Case-Insensitive Search
**Given** the API server is running  
**When** requests are made to `/api/pokemon/search?name=PIK` and `/api/pokemon/search?name=pik`  
**Then** both requests should return identical results (e.g., Pikachu, Pichu)

### AC6: Limit Results
**Given** the API server is running  
**When** a GET request is made to `/api/pokemon/search?name=a&limit=5`  
**Then** the response should:
- Return at most 5 results
- Include `count` reflecting actual results returned (up to 5)

### AC7: Response Time
**Given** the API server is running  
**When** a search request is made  
**Then** the response time should be less than 2000ms

## Technical Notes

- First fetch all Pokémon names from: `https://pokeapi.co/api/v2/pokemon?limit=2000`
- Cache the full list for faster searches
- Implement substring matching (case-insensitive)
- Return matches sorted alphabetically
- Default limit: 10 results
- Maximum limit: 50 results

## Validation

To test this ticket:
```bash
# Successful search
curl -X GET "http://localhost:3000/api/pokemon/search?name=char"

# No results
curl -X GET "http://localhost:3000/api/pokemon/search?name=xyz123"

# Missing parameter
curl -X GET http://localhost:3000/api/pokemon/search

# Too short
curl -X GET "http://localhost:3000/api/pokemon/search?name=p"

# With limit
curl -X GET "http://localhost:3000/api/pokemon/search?name=a&limit=5"
```

Expected:
- AC1: Array with Charmander, Charmeleon, Charizard
- AC2: Empty array
- AC3: 400 error
- AC4: 400 error (too short)
- AC6: Max 5 results

---

**Created**: 2026-04-15  
**Assigned**: Development Team
