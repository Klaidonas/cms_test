import React, { useEffect, useState } from 'react';
import { ProductCategories } from '../../interfaces';
import { fetchCategories } from '../../utils/firebaseFetch';

const Categories = () => {

  const [categories, setCategories] = useState<ProductCategories[]>();
  useEffect(() => {
    initialFetch()
}, [])
  const initialFetch = async() => {
    let localCategories :ProductCategories[] = await fetchCategories();
    setCategories(localCategories);
  }


  if(!categories) return <h1>Loading categories..</h1>
  return (
    <>
      {categories.map((category) => (
        <div className="option">
          <label>{category.category}</label>
          <input 
            type="checkbox"
          />
        </div>
      ))}
    </>
  );
};

export default Categories;