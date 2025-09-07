import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import './App.css';

function MainButtonHandler() {
  const location = useLocation();

  useEffect(() => {
    const tg = window.Telegram?.WebApp || {};
    tg.ready && tg.ready();
    tg.expand && tg.expand();
    console.log('User:', tg.initDataUnsafe?.user || 'No Telegram user (running in browser?)');

    // Применяем класс для светлой темы, если нужно
    const theme = tg.themeParams || {};
    const isLightTheme = theme.bg_color && theme.bg_color.toLowerCase() === '#ffffff';
    document.body.className = isLightTheme ? 'light-theme' : '';
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <MainButtonHandler />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;