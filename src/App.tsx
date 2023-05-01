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

function App() {

  const [message, setMessage] = useState<any>();

  const chooseMessage = (message:any) => {
    setMessage(message);
  }


  return (
    <React.StrictMode>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsList prop = {chooseMessage}  product={message}/>} />
          <Route path='/products-manager' element={<ProductsManager/>} />
          {/* <Route path={`/`+ message} element = { } /> */}
          <Route path='/products-list' element={<ProductsList />} />
          <Route path='/products/*' element = {<ProductPage/>} />
        </Routes>
        <h1>message:{message}</h1>
      </BrowserRouter>
      <Footer />
    </React.StrictMode>
  );
}

export default App;
