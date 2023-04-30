import React, { useEffect, useState } from 'react';
import { ProductData } from '../interfaces';
import { fetchProducts } from '../utils/firebaseFetch';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';


type Props = {
  product?:string
}
 



const ProductPage = () => {
  

  
  const [productId, setProductId] = useState<any>();
  const [productData, setProductData] = useState<any>()

const getProduct = async() => {
  console.log(productId);
  if(productId) {
  const docRef = doc(db, "products", productId);
  try {
    const docSnap = await getDoc(docRef);
    setProductData(docSnap.data())
    console.log("docSnap.data(): "); console.log(docSnap.data());
} catch(error) {
    console.log(error)
}
  }
}

  
const currentUrl = window.location.href;
useEffect(() => {
  setProductId(String(currentUrl.replace('http://localhost:3000/products/', '')));
  getProduct();
  { productData && 
    console.log("productData length: "+ productData.photo[0]);
    //console.log("firt photo: " +  productData.photo.length);
    
  }
}, [productId])




if(!productData) return <h1> Loading data</h1>
console.log("slug products:"); console.log(productData);

  return (
    <div className='single-product-page'>
      <h1>SLUG/PRODUCT PAGE</h1>
      <h1>about: {productId}</h1>
      <div className="single-product-container">
        <div className="single-product-images">
          <img src={productData.photo[0]} className='thumbnail' />
          <div className="product-images-gallery">
            {productData.photo.length > 1 && productData.photo.map((productPhoto:string, i:number) => (
              <div key = {i}>
                {i!=0 && 
                  <img src= {productPhoto} alt={productData.title} className='product-gallery-img'/>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="product-info">
            <div className="title">
              <h1 className="title">{productData.title}</h1>
            </div>
            <span className='price'>&euro;{productData.price}</span>
            <div className="description">
              {/* <h4>{productData.description}</h4> */}
              <h5>DESCRIPTION</h5>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing 
                elit. Donec odio. Quisque volutpat mattis eros. Nullam 
                malesuada erat ut turpis. Suspendisse urna nibh, viverra 
                non, semper suscipit, posuere a, pede.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;