import React, { useEffect, useRef, useState } from 'react';
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

  const [checked, setChecked] = useState<boolean>()
  const handleCategory = () => {
  }
  const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  if(!categories) return <h1>Loading categories..</h1>

  return (
    <>
      {categories.map((category) => (
        <div className="option" key={category.id}>
          <label>{category.category}</label>
          <input 
            type="checkbox"
            ref = {checkboxRef}
          />
        </div>
      ))}
    </>
  );
};

export default Categories;