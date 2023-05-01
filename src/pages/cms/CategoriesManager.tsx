import React, { useEffect, useRef, useState } from 'react';
import { ProductCategories } from '../../interfaces';
import { fetchCategories } from '../../utils/firebaseFetch';
import { addCategory } from '../../CMS/CMS';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const CategoriesManager = () => {

  const [categories, setCategories] = useState<ProductCategories[]>();
  useEffect(() => {
    initialFetch()
}, [])
  const initialFetch = async() => {
    let localCategories :ProductCategories[] = await fetchCategories();
    setCategories(localCategories);
  }

  const categoryRef = useRef() as any;

  const formRef = useRef() as any;

  const handleNewCategory = async() => {
    if(categoryRef.current.value!==""){
      await addCategory(categoryRef.current.value);
      formRef.current.reset();
   }
   else alert("specify category's name")
  }
  
  const deleteProduct = async(id:string) => {
    console.log("deleted product id: " + id);
    await deleteDoc(doc(db, "product-categories", id));
  }

  return (
    <div className='categoriesManager'>
      <div className="new-category">
        <h2>Add New Category</h2>
        <form ref={formRef}>

          <div className="new-categor-title">
            <label>category name</label>
            <input type="text" ref={categoryRef} />
          </div>
          </form>
          <button onClick={handleNewCategory}>add category</button>
      </div>
      <div className="categories-list">
        <h2>Categories List</h2>
        <ul>
          {categories?.map((category)=> (
            <li key={category.id}>
              {category.category} 
              <button onClick={() => deleteProduct(category.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesManager;


