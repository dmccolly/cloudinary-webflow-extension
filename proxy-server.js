const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Proxy middleware
const proxy = createProxyMiddleware({
  target: 'https://xajo-bs7d-cagt.n7e.xano.io',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api:pYeQctVX'
  }
});

app.use('/api', proxy);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});