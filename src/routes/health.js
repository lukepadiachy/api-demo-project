function healthCheck(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'pokemon-api'
  });
}

module.exports = healthCheck;
