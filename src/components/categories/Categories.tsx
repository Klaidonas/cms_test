import React, { useEffect, useState } from 'react';
import { ProductCategories } from '../../interfaces';
import { fetchCategories } from '../../utils/firebaseFetch';
import Checkbox from './Checkbox';

const Categories = ({chooseMessage}:any) => {

  const [categories, setCategories] = useState<ProductCategories[]>([]);
  useEffect(() => {
    initialFetch()
}, [])
  const initialFetch = async() => {
    let localCategories :ProductCategories[] = await fetchCategories();
    setCategories(localCategories);
  }
  const [selectedItems, setSelectedItems] = useState([]);
  if(!categories) return <h1>Loading categories..</h1>
  
  const handleCheckboxChange = (event:any) => {
    const categoryId = event.target.id;
    const isChecked = event.target.checked;

    setCategories((prevCategories) =>
      prevCategories?.map((category) =>
        category.id === categoryId ? { ...category, checked: isChecked } : category
      )
    );
    
  };
  
  const handleSaveButtonClick = (event: any) => {
    event.preventDefault();
    const selected = categories.filter((category) => category.checked);
    const selectedIds:any = selected.map((category) => category.id);
    chooseMessage(selectedIds);
    console.log("selectedItems: " + selectedItems);
    
  };

  return (
    <>
      <Checkbox categories={categories} handleCheckboxChange={handleCheckboxChange}/>
      <button onClick={handleSaveButtonClick}>Save</button>
      <h3>selected categories:</h3>
      {selectedItems.map((category, i) => (
        <li key={i}>{category}</li>
      ))}
    </>
  );
};

export default Categories;