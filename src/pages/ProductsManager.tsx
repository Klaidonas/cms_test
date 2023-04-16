import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { addProduct } from '../CMS/CMS';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';
import { v4 } from 'uuid';




const ProductsManager = () => {

  const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [imageUpload, setImageUpload] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>();
  const handleNewProduct = async () => {
    await uploadImage(); 
  }
      useEffect(()=> {
        console.log("image url:" + imageUrl);
        {imageUrl && 
         addProduct(
          titleRef.current.value, 
          imageUrl,
          priceRef.current.value);
         }
      }, [imageUrl])
  
  
  const uploadImage = async() => {
    if(imageUpload == null) return;
    for(let i = 0; i < imageUpload.length; i++) {
      console.log(i);
      const imageRef = ref(storage, `products_list/${imageUpload[i].name + v4()}`);
      await uploadBytes(imageRef, imageUpload[i])
      .then((snapshot) => {
      getDownloadURL(snapshot.ref)
       .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error)
      })
    })
    console.log(i);
    }
  };

  return (
    <div className='productsManager'>
      <h1>Products Manager</h1>
      <div className="new-product">

        <h2>Upload New Product</h2>

        <div className="new-title">
          <label>Product's title</label>
          <input type="text" ref={titleRef}/>
        </div>
        <div className="new-image">
          <label>Product's image</label>
          <input type="file" multiple onChange = {(event) => {setImageUpload(event.target.files)}}/>
        </div>
        <div className="new-price">
          <label>Product's price</label>
          <input type="text" ref={priceRef}/>
        </div>

        <button onClick={handleNewProduct}>add product</button>
      </div>
    </div>
  );
};

export default ProductsManager;