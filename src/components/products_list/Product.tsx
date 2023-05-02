import React, { useEffect, useState } from 'react';
import { ProductData } from '../../interfaces';
import { fetchProducts } from '../../utils/firebaseFetch';

const Product = () => {
      const [products, setProducts] = useState<ProductData[]>();
      useEffect(() => {
        initialFetch()
    }, [])
      const initialFetch = async() => {
        let localProducts :ProductData[] = await fetchProducts();
        setProducts(localProducts);
      }
      
      async function handleClick(prop:string) {
        window.location.href=`/products/${prop}`;
      }

      console.log("Product.tsx products:"); console.log(products);

      return(
        <>
          {products && products.map((product) => (
            <div className="product" onClick={()=> handleClick(product.id)} key = {product.id}>
              <div className="img">
                <img src = {product.photo[0]} alt = {product.title}/>
              </div>
              <h3>{product.title}</h3>
              <span>{product.price}</span>
            </div>
          ))}
        </>
      )
      

};

export default Product;