/**
 * Webflow Designer Extension Client
 * Handles communication with Webflow Designer
 */

// Check if we're running inside Webflow Designer
export const isInWebflowDesigner = (): boolean => {
  return typeof window !== 'undefined' && 'Webflow' in window;
};

// Initialize Webflow extension
export const initWebflowExtension = async () => {
  if (!isInWebflowDesigner()) {
    console.log('Not running in Webflow Designer - extension features disabled');
    return null;
  }

  try {
    // @ts-ignore - Webflow global is injected by Designer
    const webflow = window.Webflow;
    
    if (!webflow) {
      throw new Error('Webflow API not available');
    }

    console.log('✅ Webflow Designer Extension initialized');
    return webflow;
  } catch (error) {
    console.error('Failed to initialize Webflow extension:', error);
    return null;
  }
};

// Insert image into Webflow page
export const insertImageIntoWebflow = async (imageUrl: string, altText: string) => {
  if (!isInWebflowDesigner()) {
    console.warn('Cannot insert image - not in Webflow Designer');
    alert('This feature only works inside Webflow Designer.\n\nTo use this extension:\n1. Go to Webflow Designer\n2. Open Designer Extensions\n3. Add this extension URL');
    return false;
  }

  try {
    // @ts-ignore
    const webflow = window.Webflow;
    
    if (!webflow) {
      throw new Error('Webflow API not available');
    }

    // Get the currently selected element or the body
    const selectedElement = await webflow.getSelectedElement();
    const targetElement = selectedElement || await webflow.getRootElement();

    // Create an image element
    const imageElement = await webflow.createDOM('img');
    
    // Set image properties
    await imageElement.setStyles({
      'max-width': '100%',
      'height': 'auto'
    });
    
    await imageElement.setAttributes({
      'src': imageUrl,
      'alt': altText,
      'loading': 'lazy'
    });

    // Insert the image
    await targetElement.append(imageElement);
    
    console.log('✅ Image inserted into Webflow:', imageUrl);
    return true;
  } catch (error) {
    console.error('Failed to insert image into Webflow:', error);
    alert(`Failed to insert image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

// Get Webflow site info
export const getWebflowSiteInfo = async () => {
  if (!isInWebflowDesigner()) {
    return null;
  }

  try {
    // @ts-ignore
    const webflow = window.Webflow;
    const site = await webflow.getSite();
    return site;
  } catch (error) {
    console.error('Failed to get Webflow site info:', error);
    return null;
  }
};