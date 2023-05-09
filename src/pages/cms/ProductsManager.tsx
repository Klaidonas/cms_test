import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { addProduct } from '../../CMS/CMS';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../utils/firebase';
import { v4 } from 'uuid';
import { ProductData } from '../../interfaces';
import { fetchProducts } from '../../utils/firebaseFetch';
import Categories from '../../components/categories/Categories';

const ProductsManager = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const selectCategories = (newCategories:any) => {
    // Here, you have the function from the child.
    console.log("newCategories :" +newCategories);
    
    setCategories(newCategories);
  }

  const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [imageUpload, setImageUpload] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [imageQuantity, setImageQuantity] = useState<number>();
  const [products, setProducts] = useState<ProductData[]>();

  useEffect(() => {
    initialFetch()
}, [])

  const initialFetch = async() => {
    let localProducts :ProductData[] = await fetchProducts();
    setProducts(localProducts);
  }

  const handleNewProduct = async () => {
    if(titleRef.current.value&&imageUrl
      &&priceRef.current.value&&categories
      &&imageUpload.length>0) {
        await uploadImage(); 
    }
    else alert("fill all inputs")
  }

  useEffect(()=> {  
    if(imageUrl.length===imageQuantity&&titleRef.current.value) {
      console.log("imageUrl.length: "+ imageQuantity);
      console.log("useEffecte urlCopy: " + imageUrl);
      console.log("title in addProduct: " + titleRef.current.value);

      addProduct(
        titleRef.current.value, 
        imageUrl,
        priceRef.current.value,
        categories
        )
        formRef.current.reset();
      }
  }, [imageUrl])
  

    const uploadImage = async() => {
      setImageQuantity(imageUpload.length);

      console.log("imageUpload: " + imageUpload);
      
      if(imageUpload == null) return;

      const productImagesCollection = `products_list/${titleRef.current.value}`
      
      for(let i = 0; i < imageUpload.length; i++) {
    
        const imageRef = ref(storage, `${productImagesCollection}/${imageUpload[i].name + v4()}`);
        
        await uploadBytes(imageRef, imageUpload[i])
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
          .then((url:string) => {
            setImageUrl(current => [...current, url])
            console.log("setImageUrl: " + imageUrl);
          })
          .catch((error) => { alert(error) })
        })
      }
  };

  const deleteProduct = async(id:string) => {
    console.log("deleted product id: " + id);
    await deleteDoc(doc(db, "products", id));
  }

  const formRef = useRef() as any;
 
  return (
    <div className='productsManager'>
      <div className="new-product">

        <h2>Upload New Product</h2>
        <form ref={formRef}>
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
          <div className="categories">
            <h4>Categories</h4>
             <Categories selectCategories={selectCategories}/> 
          </div>
        </form>
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
                <img src = {product.photo[0]} alt = {product.title}/>
              </div>
              <div className="btn">
                <button onClick={() => deleteProduct(product.id)}>X</button>
              </div> 
            </div>
          ))}

      </div>
    </div>
  );
};

export default ProductsManager;