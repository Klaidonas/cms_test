import React from 'react';
import ProductsList from '../components/products_list/ProductsList';

const Home = () => {
  return (
    <div>
      <section>
        <h1>HomePage</h1>
      </section>
      <section>
        <ProductsList />
      </section>
      <section>
      </section>
    </div>
  );
};

export default Home;