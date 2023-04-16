import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { ProductData } from "../interfaces";

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