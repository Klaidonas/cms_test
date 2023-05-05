import React, { useState } from 'react';
import './styles/App.scss';
import Home from './pages/Home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ProductsManager from './pages/cms/ProductsManager';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProductsList from './components/products_list/ProductsList';
import ProductPage from './pages/[slug]';
import path from 'path';
import CategoriesManager from './pages/cms/CategoriesManager';

function App() {

  return (
    <React.StrictMode>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsList/>} />
          <Route path='/products-manager' element={<ProductsManager/>} />
          <Route path='/categories-manager' element={<CategoriesManager/>} />
          <Route path='/products-list' element={<ProductsList />} />
          <Route path='/products/*' element = {<ProductPage/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </React.StrictMode>
  );
}

export default App;
