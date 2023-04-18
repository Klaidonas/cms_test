import React from 'react';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc  } from "firebase/firestore"; 
import { db, firestore } from '../utils/firebase';
import { ProductData } from '../interfaces';
  
export const addProduct = async(title: string, photo: string, price: string) => {
  const id=doc(collection(db, "products")).id;
  await setDoc(doc(db, "products", id), {
    id: id,
    title: title,
    photo: photo,
    price: price
  });
  console.log("id: " + id);
}


export const removeProduct = async(x:any) => {
  await deleteDoc(doc(db, "products", x));
}

  


