# TICKET-007: Battle Type Matchup Calculator

**Type**: Feature  
**Priority**: High  
**Status**: Ready for Development

## Description

Create an endpoint to calculate the type effectiveness multiplier for a battle scenario. Given an attacking type and defending type(s), return the damage multiplier (e.g., 2x, 0.5x, 0x).

## Endpoint Specification

- **Method**: `GET`
- **Path**: `/api/battle/matchup`
- **Query Parameters**:
  - `attacker` (required): Attacking type name
  - `defender` (required): Defending type name(s), comma-separated for dual-type Pokémon
- **Authentication**: None required

## Acceptance Criteria

### AC1: Single-Type Defender (Super Effective)
**Given** the API server is running  
**When** a GET request is made to `/api/battle/matchup?attacker=fire&defender=grass`  
**Then** the response should:
- Return HTTP status code `200`
- Include `success: true`
- Include effectiveness multiplier of `2` (super effective)
- Include effectiveness text

**Example Response**:
```json
{
  "success": true,
  "data": {
    "attacker": "fire",
    "defender": ["grass"],
    "multiplier": 2,
    "effectiveness": "Super Effective"
  }
}
```

### AC2: Single-Type Defender (Not Very Effective)
**Given** the API server is running  
**When** a GET request is made to `/api/battle/matchup?attacker=fire&defender=water`  
**Then** the response should:
- Return multiplier of `0.5`
- Return effectiveness text "Not Very Effective"

**Example Response**:
```json
{
  "success": true,
  "data": {
    "attacker": "fire",
    "defender": ["water"],
    "multiplier": 0.5,
    "effectiveness": "Not Very Effective"
  }
}
```

### AC3: Single-Type Defender (No Effect)
**Given** the API server is running  
**When** a GET request is made to `/api/battle/matchup?attacker=normal&defender=ghost`  
**Then** the response should:
- Return multiplier of `0`
- Return effectiveness text "No Effect"

**Example Response**:
```json
{
  "success": true,
  "data": {
    "attacker": "normal",
    "defender": ["ghost"],
    "multiplier": 0,
    "effectiveness": "No Effect"
  }
}
```

### AC4: Dual-Type Defender
**Given** the API server is running  
**When** a GET request is made to `/api/battle/matchup?attacker=electric&defender=water,flying`  
**Then** the response should:
- Return multiplier of `4` (2x from water, 2x from flying = 4x total)
- Return effectiveness text "4x Super Effective"

**Example Response**:
```json
{
  "success": true,
  "data": {
    "attacker": "electric",
    "defender": ["water", "flying"],
    "multiplier": 4,
    "effectiveness": "4x Super Effective"
  }
}
```

### AC5: Neutral Effectiveness
**Given** the API server is running  
**When** a GET request is made to `/api/battle/matchup?attacker=normal&defender=normal`  
**Then** the response should:
- Return multiplier of `1`
- Return effectiveness text "Neutral"

### AC6: Missing Parameters
**Given** the API server is running  
**When** a GET request is made without required parameters  
**Then** the response should:
- Return HTTP status code `400`
- Include an error message

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "MISSING_PARAMETERS",
    "message": "Both 'attacker' and 'defender' parameters are required"
  }
}
```

### AC7: Invalid Type Names
**Given** the API server is running  
**When** a GET request is made to `/api/battle/matchup?attacker=invalid&defender=grass`  
**Then** the response should:
- Return HTTP status code `400`
- Include an error message about invalid type

**Example Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TYPE",
    "message": "Type 'invalid' is not a valid Pokémon type"
  }
}
```

### AC8: Effectiveness Text Mapping
**Given** the matchup is calculated  
**When** the multiplier is determined  
**Then** the effectiveness text should be:
- `0` → "No Effect"
- `0.25` → "4x Resisted"
- `0.5` → "Not Very Effective"
- `1` → "Neutral"
- `2` → "Super Effective"
- `4` → "4x Super Effective"

### AC9: Response Time
**Given** the API server is running  
**When** a matchup calculation is performed  
**Then** the response time should be less than 500ms

## Technical Notes

- This endpoint should use cached type data (from TICKET-005/006)
- For dual-type defenders, multiply the effectiveness values
- Calculation formula:
  ```
  For each defender type:
    Get effectiveness from attacker to defender type
  Final multiplier = multiply all individual effectiveness values
  ```
- Example: Electric vs Water/Flying
  - Electric → Water = 2x
  - Electric → Flying = 2x
  - Total = 2 × 2 = 4x

## Validation

To test this ticket:
```bash
# Super effective
curl -X GET "http://localhost:3000/api/battle/matchup?attacker=fire&defender=grass"

# Not very effective
curl -X GET "http://localhost:3000/api/battle/matchup?attacker=fire&defender=water"

# No effect
curl -X GET "http://localhost:3000/api/battle/matchup?attacker=normal&defender=ghost"

# Dual type (4x)
curl -X GET "http://localhost:3000/api/battle/matchup?attacker=electric&defender=water,flying"

# Missing parameters
curl -X GET "http://localhost:3000/api/battle/matchup?attacker=fire"

# Invalid type
curl -X GET "http://localhost:3000/api/battle/matchup?attacker=invalid&defender=grass"
```

Expected:
- AC1: 2x multiplier
- AC2: 0.5x multiplier
- AC3: 0x multiplier
- AC4: 4x multiplier
- AC6: 400 error
- AC7: 400 error

---

**Created**: 2026-04-15  
**Assigned**: Development Team
