# Postman Collection for Pokemon API

This directory contains Postman collection and environment files for testing the Pokemon API demo project.

## Files

- **Pokemon_API.postman_collection.json** - Complete API collection with all endpoints
- **Pokemon_API.postman_environment.json** - Environment variables for local development

## Quick Start

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Select `Pokemon_API.postman_collection.json`
4. The collection will appear in your Collections sidebar

### 2. Import Environment
1. Click the **Environments** tab (gear icon)
2. Click **Import**
3. Select `Pokemon_API.postman_environment.json`
4. Select "Pokemon API - Local" from the environment dropdown

### 3. Start the API Server
```bash
npm start
```

### 4. Run Requests
The collection is organized into 5 main folders:
- **Health & Status** - API health check
- **Pokemon Endpoints** - Core Pokemon operations
- **Type Endpoints** - Pokemon type information
- **Battle System** - Type effectiveness calculations
- **Error Cases** - Error handling tests

## Endpoints Overview

### Health & Status
- `GET /health` - Check API health

### Pokemon Endpoints
- `GET /api/pokemon` - List all Pokemon
- `GET /api/pokemon?limit=5&offset=10` - Paginated list
- `GET /api/pokemon/25` - Get Pokemon by ID
- `GET /api/pokemon/pikachu` - Get Pokemon by name
- `GET /api/pokemon/search?name=char` - Search Pokemon

### Type Endpoints
- `GET /api/types` - List all types
- `GET /api/types/fire` - Get type details

### Battle System
- `GET /api/battle/matchup?attacker=fire&defender=grass` - Type effectiveness

### Error Cases
- Invalid Pokemon ID/name
- Invalid search parameters
- Invalid type names
- Missing required parameters

## Environment Variables

| Variable | Default Value | Description |
|----------|--------------|-------------|
| `base_url` | `http://localhost:3000` | API base URL |
| `api_version` | `v1` | API version |

## Running the Collection

### Run All Requests
1. Right-click on the collection name
2. Select **Run collection**
3. Click **Run Pokemon API - Demo Project**

### Run Individual Folders
1. Expand the collection
2. Right-click on any folder (e.g., "Pokemon Endpoints")
3. Select **Run folder**

## Testing Tips

1. **Start with Health Check** - Verify the server is running
2. **Test Happy Paths First** - Run Pokemon and Type endpoints
3. **Test Error Cases** - Verify proper error handling
4. **Use Battle System** - Test type effectiveness calculations

## Expected Response Codes

- **200 OK** - Successful request
- **400 Bad Request** - Invalid parameters or validation error
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

## Collection Features

✅ All 7+ main endpoints covered  
✅ Pagination examples included  
✅ Error test cases for validation  
✅ Descriptive names and documentation  
✅ Environment variable support  
✅ Organized by feature category  
✅ Battle matchup examples  

## Notes

- The collection uses `{{base_url}}` variable for easy environment switching
- All requests include detailed descriptions
- Error cases help validate API robustness
- Battle matchups demonstrate type effectiveness (super effective, not very effective, neutral)

## Customization

To use a different server URL:
1. Go to Environments
2. Select "Pokemon API - Local"
3. Change `base_url` value
4. Save the environment

## Support

For issues or questions about the API endpoints, refer to the main project README.
