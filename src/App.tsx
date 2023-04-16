import React from 'react';
import './styles/App.scss';
import Home from './pages/Home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ProductsManager from './pages/ProductsManager';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <React.StrictMode>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Home />} />
          <Route path='/products-manager' element={<ProductsManager/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </React.StrictMode>
  );
}

export default App;
