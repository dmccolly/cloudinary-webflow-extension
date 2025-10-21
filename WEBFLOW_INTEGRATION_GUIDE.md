# Webflow Designer Extension Integration Guide

## Overview
This extension allows you to browse and insert Cloudinary assets directly into Webflow Designer.

## Current Status
✅ Extension built and deployed
✅ Cloudinary integration working
✅ Search and filtering implemented
✅ Webflow Designer SDK integration added
⏳ Needs to be registered in Webflow

## How to Use in Webflow Designer

### Step 1: Access Webflow Designer Extensions
1. Open your Webflow project
2. Go to the Designer
3. Click on the "Apps" panel (left sidebar)
4. Click "Designer Extensions" or "Add Extension"

### Step 2: Add the Extension
There are two ways to add the extension:

#### Option A: Development Mode (Testing)
1. In Designer Extensions, click "Add Extension"
2. Choose "Development Extension"
3. Enter the extension URL: `https://cloudinary-webflow-extension.netlify.app`
4. The extension will load in a panel

#### Option B: Published Extension (Production)
1. Submit the extension to Webflow Marketplace
2. Users can install it from the marketplace
3. Requires Webflow review and approval

### Step 3: Use the Extension
1. Once loaded, you'll see the Cloudinary Asset Browser
2. Browse your Cloudinary assets
3. Use search and filters to find specific assets
4. Click "Insert" on any asset to add it to your page

## Extension Features

### 🖼️ Asset Browsing
- View all assets from your Cloudinary library
- Thumbnail previews with metadata
- Pagination with "Load More"

### 🔍 Search & Filter
- **Search**: Searches across filename, display name, tags, and format
- **Type Filter**: Filter by image, video, or raw files
- **Tag Filter**: Filter by specific tags

### ➕ Insert into Webflow
- Click "Insert" button on any asset
- Image is automatically added to the selected element or page body
- Includes proper alt text and responsive styling

### 📋 Copy URL
- Click "Copy URL" to copy the asset's secure URL to clipboard
- Useful for manual insertion or external use

## Technical Details

### Extension URL
- **Production**: https://cloudinary-webflow-extension.netlify.app
- **GitHub**: https://github.com/dmccolly/cloudinary-webflow-extension

### Webflow API Integration
The extension uses Webflow's Designer Extension SDK to:
- Detect when running inside Webflow Designer
- Access the selected element or page body
- Create and insert image elements
- Set proper attributes and styles

### Code Location
- **Webflow Client**: `src/webflow/webflowClient.ts`
- **Insert Handler**: `src/components/AssetCard.tsx` (handleInsert function)

## Extension Manifest
Location: `public/extension.json`

```json
{
  "name": "Cloudinary Asset Browser",
  "description": "Browse and insert media assets from your Cloudinary library",
  "version": "1.0.0",
  "entryPoint": "https://cloudinary-webflow-extension.netlify.app",
  "permissions": [
    "designer:read",
    "designer:write"
  ]
}
```

## Permissions Required
- **designer:read**: Read page structure and selected elements
- **designer:write**: Insert images into the page

## Testing Outside Webflow
When opened outside Webflow Designer:
- Extension loads normally
- All browsing features work
- Insert button shows a message explaining it only works in Webflow
- Copy URL button works for manual insertion

## Deployment
The extension is deployed to Netlify and automatically updates when code is pushed to GitHub.

### Update Process
1. Make changes to code
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod`
4. Changes are live immediately

## Next Steps

### For Development/Testing
1. Open Webflow Designer
2. Add as Development Extension
3. Test the Insert functionality
4. Verify images are properly inserted

### For Production
1. Create icon.png for the extension
2. Take screenshots of the extension in use
3. Write detailed description
4. Submit to Webflow Marketplace
5. Wait for review and approval

## Troubleshooting

### Extension Not Loading
- Check that the URL is correct
- Verify Netlify deployment is successful
- Check browser console for errors

### Insert Button Not Working
- Verify you're inside Webflow Designer
- Check browser console for Webflow API errors
- Ensure proper permissions are granted

### Images Not Appearing
- Check that Cloudinary URLs are accessible
- Verify image URLs are HTTPS
- Check Webflow element structure

## Support
For issues or questions:
- Check browser console for error messages
- Verify Cloudinary credentials are correct
- Ensure Webflow Designer API is available

## Resources
- [Webflow Designer Extensions Documentation](https://developers.webflow.com/docs/designer-extensions)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Extension GitHub Repository](https://github.com/dmccolly/cloudinary-webflow-extension)