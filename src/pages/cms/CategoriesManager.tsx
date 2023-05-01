import React, { useEffect, useRef, useState } from 'react';
import { ProductCategories } from '../../interfaces';
import { fetchCategories } from '../../utils/firebaseFetch';
import { addCategory } from '../../CMS/CMS';

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
    await addCategory(categoryRef.current.value);
    formRef.current.reset();
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
            <li key={category.id}>{category.category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesManager;


