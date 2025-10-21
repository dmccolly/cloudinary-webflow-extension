import { CloudinaryResponse } from '../types';

// Mock data for demonstration when CORS is blocking
export const mockCloudinaryData: CloudinaryResponse = {
  resources: [
    {
      public_id: "HIBF_assets/sample1",
      format: "jpg",
      version: 1760732037,
      resource_type: "image",
      type: "upload",
      created_at: "2025-10-17T20:13:57Z",
      bytes: 133429,
      width: 1224,
      height: 1584,
      url: "https://res.cloudinary.com/dzrw8nopf/image/upload/v1760732037/HIBF_assets/sample1.jpg",
      secure_url: "https://res.cloudinary.com/dzrw8nopf/image/upload/v1760732037/HIBF_assets/sample1.jpg",
      tags: ["sample", "demo"]
    },
    {
      public_id: "HIBF_assets/sample2",
      format: "png",
      version: 1760560248,
      resource_type: "image",
      type: "upload",
      created_at: "2025-10-15T20:30:48Z",
      bytes: 50360,
      width: 564,
      height: 689,
      url: "https://res.cloudinary.com/dzrw8nopf/image/upload/v1760560248/HIBF_assets/sample2.png",
      secure_url: "https://res.cloudinary.com/dzrw8nopf/image/upload/v1760560248/HIBF_assets/sample2.png",
      tags: ["sample"]
    }
  ],
  next_cursor: "sample_cursor_123"
};