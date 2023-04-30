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
  const [productData, setProductData] = useState<any>()

const getProduct = async() => {
  console.log(productId);
  if(productId) {
  const docRef = doc(db, "products", productId);
  try {
    const docSnap = await getDoc(docRef);
    setProductData(docSnap.data())
    console.log(docSnap.data());
} catch(error) {
    console.log(error)
}
  }
}

  

useEffect(() => {
  setProductId(String(currentUrl.replace('http://localhost:3000/products/', '')));
  getProduct();
  { productData && 
    console.log("productData length: "+ productData.photo.length);
  }
}, [productId])



  return (
    <div className='product-page'>
      <h1>SLUG/PRODUCT PAGE</h1>
      <h1>about: {productId}</h1>
      { productData && 
      <div className="product-container">
          <div className="gallery">
            {productData && productData.photo.length > 0 && productData.photo.map((productPhoto:any, i:number) => (
              <div className="image-container" key = {i}      >
                  <img src= {productPhoto} alt={productData.title} className={`xd i${ + i}`}/> 
              </div>
            ))}
          </div>

      </div>
      
      
      }
      <h1>snap: {}</h1>
      <div className="product-container">
        <ul className="product-gallery">
         
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;