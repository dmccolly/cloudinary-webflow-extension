exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { PAGE = 1, limit = 20, search = '', resource_type = 'image', tag = '' } = event.queryStringParameters || {};
    
    const xanoUrl = `https://xajo-bs7d-cagt.n7e.xano.io/api:pYeQctVX/cloudinary_assets?PAGE=${PAGE}&limit=${limit}&search=${encodeURIComponent(search)}&resource_type=${resource_type}&tag=${encodeURIComponent(tag)}`;
    
    const response = await fetch(xanoUrl);
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch data from Xano' })
    };
  }
};