# Cloudinary Webflow Extension

A Webflow Designer Extension for browsing and inserting Cloudinary media assets.

## Features

- 🖼️ Browse Cloudinary assets (images, videos, raw files)
- 🔍 Search assets by name or keyword
- 🏷️ Filter by resource type and tags
- 📄 Pagination support for large libraries
- 📋 Copy asset URLs to clipboard
- ➕ Insert assets into Webflow (ready for Webflow API integration)
- 🎨 Modern, responsive UI

## Prerequisites

- Node.js 18+ and npm
- Xano backend configured and running
- Cloudinary account with assets

## Installation

1. **Install dependencies:**
   ```bash
   cd cloudinary-webflow-extension
   npm install
   ```

2. **Configure Xano endpoint (if needed):**
   
   Edit `src/config.ts` to update your Xano endpoint:
   ```typescript
   export const XANO_CONFIG = {
     BASE_URL: 'https://xajo-bs7d-cagt.n7e.xano.io',
     API_GROUP: 'api:pYeQctVX',
     ENDPOINT: 'cloudinary_assets',
   };
   ```

## Development

Run the development server:

```bash
npm run dev
```

The extension will be available at `http://localhost:3000`

## Building for Production

Build the extension:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
cloudinary-webflow-extension/
├── src/
│   ├── components/          # React components
│   │   ├── AssetBrowser.tsx # Main browser component
│   │   ├── AssetCard.tsx    # Individual asset card
│   │   ├── AssetGrid.tsx    # Grid layout
│   │   ├── SearchBar.tsx    # Search functionality
│   │   └── FilterBar.tsx    # Filter controls
│   ├── hooks/               # Custom React hooks
│   │   └── useCloudinaryAssets.ts
│   ├── services/            # API services
│   │   └── xanoService.ts   # Xano API integration
│   ├── config.ts            # Configuration
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Usage

### Browsing Assets

1. Open the extension in your browser
2. Assets will load automatically from your Cloudinary library
3. Use the search bar to find specific assets
4. Use filters to narrow by type (image/video/raw) or tags

### Searching

Type in the search bar to filter assets by name or keyword. Search is debounced for better performance.

### Filtering

- **Type Filter:** Select image, video, or raw files
- **Tag Filter:** Enter a tag to filter assets

### Pagination

Click "Load More Assets" to fetch additional assets from your library.

### Inserting Assets

Click the "Insert" button on any asset card. Currently shows an alert with the asset URL. 

**For Webflow Integration:** Update the `handleInsert` function in `AssetCard.tsx` to use the Webflow Designer API.

## API Integration

### Xano Endpoint

The extension calls the Xano endpoint with this format:

**Request:**
```json
POST https://xajo-bs7d-cagt.n7e.xano.io/api:pYeQctVX/cloudinary_assets

{
  "PAGE": 1,
  "limit": 20,
  "search": "",
  "resource_type": "image",
  "tag": ""
}
```

**Response:**
```json
{
  "resources": [
    {
      "public_id": "sample",
      "url": "https://res.cloudinary.com/...",
      "secure_url": "https://res.cloudinary.com/...",
      "width": 1920,
      "height": 1080,
      "format": "jpg",
      "bytes": 123456,
      "created_at": "2024-01-01T00:00:00Z",
      "tags": ["featured"]
    }
  ],
  "next_cursor": "abc123...",
  "rate_limit_remaining": 499
}
```

## Webflow Designer Integration

To integrate with Webflow Designer, you'll need to:

1. Register the extension with Webflow
2. Use the Webflow Designer Extension SDK
3. Update the `handleInsert` function to use Webflow's API

Example integration:
```typescript
const handleInsert = async () => {
  // Use Webflow Designer API
  await webflow.insertImage({
    url: asset.secure_url,
    alt: asset.public_id,
    width: asset.width,
    height: asset.height
  });
};
```

## Customization

### Styling

All styles are in CSS files next to their components. Edit these files to customize the appearance:

- `src/index.css` - Global styles and CSS variables
- `src/components/*.css` - Component-specific styles

### Configuration

Edit `src/config.ts` to change:
- Xano endpoint URL
- API group and endpoint names
- Cloudinary cloud name

## Troubleshooting

### Assets not loading

1. Check that Xano endpoint is accessible
2. Verify External Access is enabled in Xano
3. Check browser console for errors
4. Test endpoint with: `bash ../test_endpoint.sh`

### CORS errors

Ensure Xano API Group has CORS enabled for your domain.

### Search not working

Search is debounced by 500ms. Wait a moment after typing.

## Testing

Test the Xano endpoint:
```bash
cd ..
bash test_endpoint.sh
```

## License

MIT

## Support

For issues related to:
- **Xano backend:** See `../XANO_AUTH_FIX_GUIDE.md`
- **Integration:** See `../WEBFLOW_INTEGRATION_NEXT_STEPS.md`
- **Extension code:** Check browser console for errors