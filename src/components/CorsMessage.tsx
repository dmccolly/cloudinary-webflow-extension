import React from 'react';
import './CorsMessage.css';

export const CorsMessage: React.FC = () => {
  return (
    <div className="cors-message">
      <div className="cors-content">
        <h2>🔧 Configuration Required</h2>
        <p>Your extension is ready, but needs CORS enabled in Xano.</p>
        
        <div className="cors-steps">
          <h3>Quick Fix (2 minutes):</h3>
          <ol>
            <li>Go to <strong>Xano Dashboard</strong></li>
            <li>Navigate to <strong>API → Digital Media Archive → Settings</strong></li>
            <li>Find <strong>CORS</strong> or <strong>Cross-Origin</strong> settings</li>
            <li>Add this domain: <code>https://sites.super.myninja.ai</code></li>
            <li>Or set to <code>*</code> (allow all)</li>
            <li>Save and refresh this page</li>
          </ol>
        </div>

        <div className="cors-alternative">
          <h3>Alternative: Test Endpoint Directly</h3>
          <p>You can test your Xano endpoint directly:</p>
          <a 
            href="https://xajo-bs7d-cagt.n7e.xano.io/api:pYeQctVX/cloudinary_assets?PAGE=1&limit=5&search=&resource_type=image&tag="
            target="_blank"
            rel="noopener noreferrer"
            className="test-link"
          >
            Test Xano Endpoint →
          </a>
          <p><small>This should show your Cloudinary data in JSON format</small></p>
        </div>

        <div className="cors-help">
          <h3>Need Help?</h3>
          <p>If you can't find CORS settings in Xano:</p>
          <ul>
            <li>Contact Xano support</li>
            <li>Ask them to enable CORS for: <code>https://sites.super.myninja.ai</code></li>
            <li>Or enable CORS globally with <code>*</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};