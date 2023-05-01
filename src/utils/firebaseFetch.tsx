import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { ProductCategories, ProductData } from "../interfaces";

export const fetchProducts = async() => {
  const productsCollection = collection(firestore, "products");
  let localProducts:ProductData[] = [];
  await getDocs(productsCollection)
  .then((response) => {
    response.forEach((product) => {
      localProducts.push({ ...product.data(), id: product.id }as ProductData)
    })
    console.log("local products: " + localProducts);
  })
  .catch(err => {
    alert(err.message)
  })
  return localProducts
}

export const fetchCategories = async() => {
  const productsCollection = collection(firestore, "product-categories");
  let localCategories:ProductCategories[] = [];
  await getDocs(productsCollection)
  .then((response) => {
    response.forEach((product) => {
      localCategories.push({ ...product.data(), id: product.id }as ProductCategories)
    })
    console.log("local products: " + localCategories);
  })
  .catch(err => {
    alert(err.message)
  })
  return localCategories
}