import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './assets/icons/logo.png'
import './App.css'


function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const navigate = useNavigate();

  const handleAlert = () => {
    alert('To install, open your browser menu and look for Add to Home Screen or Install App.')
  }

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
     <div className='inatall-app'>
      <div className='logo'><img src={logo} alt="" /></div>
    <div class="install-wrapper">
      <div class="install-prompt">
        <h2>To Unlock or Stake your Pi coin Install The App for Faster Access</h2>
        <p><strong>Mobile Users:</strong> Tap the <span class="icon">⋮</span> (top right) or <span class="icon">⬆</span> (bottom of screen), then tap <strong>"Add to Home Screen"</strong>.</p>
        <p><strong>Computer Users:</strong> Click the <strong>install icon</strong> <span class="icon">🖥️➕</span> in the address bar or from your browser menu.</p>
        <button onClick={handleAlert}>Need Help?</button>
      </div>
    </div>
      {/* {showInstallButton && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
      )} */}
    </div>
  );
}

export default App
