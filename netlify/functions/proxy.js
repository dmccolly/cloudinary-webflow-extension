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
    const { limit = 20, search = '', resource_type = 'image', tag = '', next_cursor = '' } = event.queryStringParameters || {};
    
    // Build Xano URL with parameters
    let xanoUrl = `https://xajo-bs7d-cagt.n7e.xano.io/api:pYeQctVX/cloudinary_assets?limit=${limit}&search=${encodeURIComponent(search)}&resource_type=${resource_type}&tag=${encodeURIComponent(tag)}`;
    
    // Add cursor for pagination if provided
    if (next_cursor) {
      xanoUrl += `&next_cursor=${encodeURIComponent(next_cursor)}`;
    }
    
    console.log('Fetching from Xano:', xanoUrl);
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