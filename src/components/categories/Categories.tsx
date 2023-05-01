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

  const [checked, setChecked] = useState<boolean>()
  const handleCategory = () => {
  }
  if(!categories) return <h1>Loading categories..</h1>
  return (
    <>
      {categories.map((category) => (
        <div className="option" key={category.id}>
          <label>{category.category}</label>
          <input 
            type="checkbox"
            checked={checked}
            onClick={()=>setChecked(!checked)}
            onChange={()=>console.log(checked)
            }
          />
        </div>
      ))}
    </>
  );
};

export default Categories;