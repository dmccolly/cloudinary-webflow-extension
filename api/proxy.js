// Serverless function to proxy Xano requests
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { PAGE = 1, limit = 20, search = '', resource_type = 'image', tag = '' } = req.query;
    
    const xanoUrl = `https://xajo-bs7d-cagt.n7e.xano.io/api:pYeQctVX/cloudinary_assets?PAGE=${PAGE}&limit=${limit}&search=${search}&resource_type=${resource_type}&tag=${tag}`;
    
    const response = await fetch(xanoUrl);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}