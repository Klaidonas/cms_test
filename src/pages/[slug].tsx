import React, { useEffect, useState } from 'react';
import { ProductData } from '../interfaces';
import { fetchProducts } from '../utils/firebaseFetch';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';


type Props = {
  product?:string
}

const ProductPage = () => {
  

  const currentUrl = window.location.href
  const [productId, setProductId] = useState<any>();

const getProduct = async() => {
  console.log(productId);
  if(productId) {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  console.log("docSnap.data: " + docSnap.data());
  }
}

  

useEffect(() => {
  setProductId(String(currentUrl.replace('http://localhost:3001/products/', '')));
  getProduct();
}, [productId])



  return (
    <div className='product-page'>
      <h1>SLUG/PRODUCT PAGE</h1>
      <h1>id: {productId}</h1>
      <h1>snap: {}</h1>
      <div className="product-container">
        <ul className="product-gallery">
         
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;