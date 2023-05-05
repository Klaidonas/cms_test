import React from 'react';

const Checkbox = ({categories, handleCheckboxChange}:any) => {
  if(categories==''||handleCheckboxChange=='') return <h1>bybys</h1>
  
  return (
    <>
      {categories.map((category:any) => (
        <div className="option" key={category.id}>
          <label>{category.category}</label>
          <input 
            type="checkbox"
            defaultChecked={false}
            id={category.id}
            checked={category.checked}
            onChange={handleCheckboxChange}
          />
        </div>
      ))}
    </>
  );
};

export default Checkbox;