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
    const rawData = await response.json();
    
    // Parse Xano's wrapped response
    let cloudinaryData;
    if (rawData.cloudinary_response?.request?.url) {
      // The URL field contains the actual JSON response as a string
      cloudinaryData = JSON.parse(rawData.cloudinary_response.request.url);
    } else if (rawData.resources) {
      // Direct Cloudinary response
      cloudinaryData = rawData;
    } else {
      cloudinaryData = rawData;
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(cloudinaryData)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch data from Xano', details: error.message })
    };
  }
};