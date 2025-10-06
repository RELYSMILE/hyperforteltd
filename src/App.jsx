import logo from './assets/icons/logo.png'
import './App.css'


function App() {
  
  return (
     <div className='inatall-app'>
      <div className='logo'><img src={logo} alt="" /></div>
    <div className="install-wrapper">
      <div className="install-prompt">
        <h2>Get started by installing the app—just follow the instructions below!</h2>
        <p><strong>Mobile Users:</strong> Tap the <span className="icon">⋮</span> (top right) or <span className="icon">⬆</span> (bottom of screen), then tap <strong>"Add to Home Screen"</strong>.</p>
        <p><strong>Computer Users:</strong> Click the <strong>install icon</strong> <span className="icon">🖥️➕</span> in the address bar or from your browser menu.</p>
        {/* <button onClick={handleAlert}>Need Help?</button> */}
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
