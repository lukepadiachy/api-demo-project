const express = require('express');
const cors = require('cors');
const healthCheck = require('./routes/health');
const { listPokemon, getPokemon, searchPokemon } = require('./routes/pokemon');
const { listTypes, getTypeDetails } = require('./routes/types');
const { calculateMatchup } = require('./routes/battle');
const randomEncounter = require('./routes/randomEncounter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', healthCheck);

app.get('/api/pokemon/random', randomEncounter);
app.get('/api/pokemon/search', searchPokemon);
app.get('/api/pokemon/:identifier', getPokemon);
app.get('/api/pokemon', listPokemon);

app.get('/api/types/:typeName', getTypeDetails);
app.get('/api/types', listTypes);

app.get('/api/battle/matchup', calculateMatchup);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal server error occurred'
    }
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Pokémon API Server`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
  console.log('\nAvailable Endpoints:');
  console.log('  GET  /health');
  console.log('  GET  /api/pokemon');
  console.log('  GET  /api/pokemon/random');
  console.log('  GET  /api/pokemon/:id');
  console.log('  GET  /api/pokemon/search?name=');
  console.log('  GET  /api/types');
  console.log('  GET  /api/types/:type');
  console.log('  GET  /api/battle/matchup?attacker=X&defender=Y');
  console.log('='.repeat(50));
});

module.exports = app;
