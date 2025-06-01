import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAlreadyInstalled =
      window.matchMedia('(display-mode: standalone)').matches ||
      localStorage.getItem('pwaInstalled') === 'true';

    if (isAlreadyInstalled) {
      setShowInstallButton(false);
    }

    const beforeInstallHandler = (e) => {
      e.preventDefault();
      if (!isAlreadyInstalled) {
        setDeferredPrompt(e);
        setShowInstallButton(true);
      }
    };

    const appInstalledHandler = () => {
      console.log('PWA was installed');
      localStorage.setItem('pwaInstalled', 'true');
      setShowInstallButton(false);
      // Redirect to home after install
      navigate('/home');
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);
    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, [navigate]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <div>
      <h1>Welcome to My Cool App</h1>
      {showInstallButton && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
      )}
    </div>
  );
}
