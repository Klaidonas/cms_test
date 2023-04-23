import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { addProduct, dummyFunction, removeProduct } from '../CMS/CMS';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../utils/firebase';
import { v4 } from 'uuid';
import { ProductData } from '../interfaces';
import { fetchProducts } from '../utils/firebaseFetch';




const ProductsManager = () => {

  const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [imageUpload, setImageUpload] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [urlCopy, setUrlCopy] = useState<string[]>([]);
  const handleNewProduct = async () => {
    await uploadImage(); 
    console.log("url before adding" + urlCopy);
    
    addProduct(
      titleRef.current.value, 
      urlCopy,
      priceRef.current.value,
      )
  }
      useEffect(()=> {
        
        if(imageUrl) {
          setUrlCopy(current => [...current, imageUrl]);
          console.log("useEffecte urlCopy: " + urlCopy[1]);
         }
      }, [imageUrl])
  
  
  const uploadImage = async() => {
    if(imageUpload == null) return;
    for(let i = 0; i < imageUpload.length; i++) {
      const imageRef = ref(storage, `products_list/${imageUpload[i].name + v4()}`);
      await uploadBytes(imageRef, imageUpload[i])
      .then((snapshot) => {
      getDownloadURL(snapshot.ref)
       .then((url:any) => {
        setImageUrl(url)
        console.log(url);
        
      })
      .catch((error) => {
        console.log(error)
      })
    })
    console.log(i);
    }
  };

  const deleteProduct = async(id:string) => {
    let x = doc(db, "products", id);
    console.log("id: " + id);
    await deleteDoc(doc(db, "products", id));
  }

  const [products, setProducts] = useState<ProductData[]>();
  useEffect(() => {
    initialFetch()
}, [])
  const initialFetch = async() => {
    let localProducts :ProductData[] = await fetchProducts();
    setProducts(localProducts);
  }
  
  function handleClick(prop:string) {
    window.location.href=prop;
  }
  function logUrls() {
    for(let i = 0; i< imageUpload.length; i++) {
      console.log("urlCopy: " + urlCopy[i]);
    }
    
  }

  let thumbnail:string;
  return (
    <div className='productsManager'>
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
      <div className="manager-list">
        <h2>Manage Products</h2>


        {products && products.map((product) => (
            <div className="product" key = {product.id}>
              <div className="info">
                <h3>{product.title}</h3>
                <span>{product.price}</span>
              </div>
              <div className="img">
                {/* {thumbnail = product.photo} */}
                <img src = {product.photo} alt = {product.title}/>
              </div>
              <div className="btn">
                <button onClick={() => deleteProduct(product.id)}>X</button>
                <button onClick={logUrls}>check urls</button>
              </div> 
            </div>
          ))}

      </div>
    </div>
  );
};

export default ProductsManager;