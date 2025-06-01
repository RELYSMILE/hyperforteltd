import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'


function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if app is already installed or launched in standalone mode
    const isAlreadyInstalled =
      window.matchMedia('(display-mode: standalone)').matches ||
      localStorage.getItem('pwaInstalled') === 'true';

    if (isAlreadyInstalled) {
      setIsInstalled(true);
      setShowInstallButton(false);
    }

    // Listen for beforeinstallprompt event
    const beforeInstallHandler = (e) => {
      e.preventDefault();
      if (!isAlreadyInstalled) {
        setDeferredPrompt(e);
        setShowInstallButton(true);
      }
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    // Listen for appinstalled event
    const appInstalledHandler = () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      localStorage.setItem('pwaInstalled', 'true');
    };

    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA install');
    } else {
      console.log('User dismissed the PWA install');
    }
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (isInstalled) {
    navigate('/home')
  }

  return (
     <div>
      <h1>Welcome to My Cool App</h1>
      {showInstallButton && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
      )}
      {/* rest of your app UI */}
    </div>
  );
}

export default App
