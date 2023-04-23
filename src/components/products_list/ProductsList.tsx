import React, { useEffect, useState } from 'react';
import Product from './Product';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const ProductsList = ({prop, productId}:any) => {

  const [message, setMessage] = useState<any>()
 
  const chooseMessage = (message:any) => {
    setMessage(message);
  }

  useEffect(() => {
    prop(message);
  }, [message])

  return (
    <div>
      <h1>Shop</h1>
      {/* <h1>{message}</h1> */}
      <div className="products-list">
        <Product chooseMessage={chooseMessage} productId = {productId} />
      </div>
      <section>
        
      </section>
    </div>
  );
};

export default ProductsList;