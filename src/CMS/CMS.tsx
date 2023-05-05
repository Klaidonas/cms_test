import React from 'react';
import { addDoc, collection, doc, setDoc, updateDoc  } from "firebase/firestore"; 
import { db, firestore } from '../utils/firebase';
import { ProductData } from '../interfaces';
  
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

export const addProductImage = async() => {
  
}