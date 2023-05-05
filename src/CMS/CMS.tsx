import React, { useState } from 'react';
import { addDoc, collection, doc, setDoc, updateDoc  } from "firebase/firestore"; 
import { db, firestore, storage } from '../utils/firebase';
import { ProductData } from '../interfaces';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
  
export const addProduct = async(title: string, photo: string[], price: string, categories: string[]) => {
  const id=doc(collection(db, "products")).id;
  await setDoc(doc(db, "products", id), {
    id: id,
    title: title,
    photo: photo,
    price: price,
    categories: categories
  });
  console.log("photos: " + photo);
  
  console.log("id: " + id);
}

  

export const addCategory = async(category: string) => {
  const id=doc(collection(db, "product-categories")).id;
  await setDoc(doc(db, "product-categories", id), {
    id: id,
    category: category
  });
  
  console.log("category: " + category);
  
  console.log("id: " + id);
}

// export const AddProductImage = async(
//   imageUpload:any, 
//   title:string, 
//   ) => {
//     let imageUrls:string[];
//     console.log("imageUpload: ")
//     console.log(imageUpload);
//     console.log("title: " + title);
    
//     let imageQuantity = imageUpload.length;
//     if(imageQuantity === 0) {
//       alert("error uploading photos");
//       return;
//     };

//     const productImagesCollection = `products_list/${title}`
        
//     for(let quantity of imageQuantity) {

//       const imageRef = ref(storage, `${productImagesCollection}/${imageUpload[quantity].name + v4()}`);
      
//       await uploadBytes(imageRef, imageUpload[quantity])
//       .then((snapshot) => {
//         getDownloadURL(snapshot.ref)
//         .then((url:string) => {
//           console.log("url:" + url);
//           imageUrls = [...imageUrls, url]
//           console.log("imageUrls in addproductimg: " + imageUrls)
//         })
//         .catch((error) => { alert(error) })
//       })      
      
//     } 
//   }