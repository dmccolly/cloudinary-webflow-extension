// Xano API Configuration via Netlify Functions
export const XANO_CONFIG = {
  BASE_URL: '/.netlify/functions',
  API_GROUP: '',
  ENDPOINT: 'proxy',
  
  get FULL_URL() {
    return `${this.BASE_URL}/${this.ENDPOINT}`;
  }
};

// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dzrw8nopf'
};