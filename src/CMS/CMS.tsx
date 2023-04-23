import React from 'react';
import { addDoc, arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc  } from "firebase/firestore"; 
import { db, firestore } from '../utils/firebase';
import { ProductData } from '../interfaces';
  
export const addProduct = async(title: string, photo: string[], price: string) => {
  const id=doc(collection(db, "products")).id;
  await setDoc(doc(db, "products", id), {
    id: id,
    title: title,
    photo: arrayUnion(photo),
    price: price
  });
  console.log("id: " + id);
  console.log("photo:" + photo[0]);
}
export const dummyFunction = async(title: string, photo: string[], price: string) => {
  console.log("function worked");
  
}


export const removeProduct = async(id:any) => {
  await deleteDoc(doc(db, "products", id));
}

  


