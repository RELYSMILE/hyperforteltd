import React, { useEffect } from 'react'

const LiveChat = () => {
      useEffect(() => {
        // Ensure Tawk_API is attached to the window object
        window.Tawk_API = window.Tawk_API || {};
        
        // Create the script element for Tawk.to widget
        const tawkScript = document.createElement('script');
        tawkScript.src = 'https://embed.tawk.to/67fea135ca85eb1901077dd1/1iotabeqs';
        tawkScript.async = true;
        tawkScript.charset = 'UTF-8';
        tawkScript.setAttribute('crossorigin', '*');
        
        // Append the script to the body
        document.body.appendChild(tawkScript);
        
        // Cleanup the script on component unmount
        return () => {
          document.body.removeChild(tawkScript);
        };
      }, []);
      
      return null;
    };

export default LiveChat