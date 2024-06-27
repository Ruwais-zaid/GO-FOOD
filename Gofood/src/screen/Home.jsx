import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Carousel from '../components/Carousel';

const Home = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(""); // Add search state

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        }
      });

      const resp = await response.json();
      console.log(resp);

      setItems(resp.data);
      setCategories(resp.data2);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel search={search} setSearch={setSearch} /> {/* Pass search state and setter */}
      </div>
      <div>
        {categories.map((category, index) => (
          <div key={index} className='grid md:grid-cols-1 lg:grid-cols-2'>
            <h2 className='text-6xl p-5 font-bold text-gray-600 ml-[50rem]'>{category.CategoryName}</h2>
            <hr />
            {items
              .filter(item => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
              .map((item, idx) => (
                <div key={idx}>
                  <Cards item={item.name} options={item.options[0]} image={item.img} id={idx}  />
                </div>
              ))}
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
</>
  )
}
export default Home