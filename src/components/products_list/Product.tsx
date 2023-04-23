import React, { useEffect, useState } from 'react';
import { ProductData } from '../../interfaces';
import { fetchProducts } from '../../utils/firebaseFetch';
import { useNavigate } from "react-router-dom";

const Product = () => {
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
      let thumbnail:string;

      return(
        <>
          {products && products.map((product) => (
            <div className="product" onClick={()=> handleClick(product.title)} key = {product.id}>
              <div className="img">
                <img src = {product.photo} alt = {product.title}/>
              </div>
              <h3>{product.title}</h3>
              <span>{product.price}</span>
            </div>
          ))}
        </>
      )
      

};

export default Product;