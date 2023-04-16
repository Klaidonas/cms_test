import React from 'react';
import Product from './Product';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const ProductsList = () => {

 
  return (
    <div>
      <h1>Shop</h1>
      <div className="products-list">
        <Product />
      </div>
      <section>
        
      </section>
    </div>
  );
};

export default ProductsList;