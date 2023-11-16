import React, { useState, useEffect } from 'react';
import Outfit from './Outfit.jsx';
import '../styles/style.css';

const AllOutfits = ({ SSID }) => {
  const [data, setData] = useState();
  const [array, setArray] = useState();
  const [categories, setCategories] = useState({
    casual: false,
    smartCasual: false,  
    businessAttire: false,
    formal: false,
    athleisure: false,
  });

  // inital data
  useEffect(() => {
    fetch(`/outfits/alloutfits`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/JSON',
      },
      body: JSON.stringify({
        SSID: SSID,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }, []); 

  const handleCheckChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'categories') {
      setCategories(
        {...categories, [value]:checked},
      )
    }
  }

  const selectedCategories = Object.keys(categories)
  .filter((key) => (categories[key] === true));

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/outfits/filteredoutfits`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/JSON',
      },
      body: JSON.stringify({
        SSID: SSID, 
        categories: selectedCategories,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('these are all filtered outfits from frontend', res.rows);
        setData(res.rows);
      })
      .catch((error) => {
        console.log('an error occured while getting the outfits data');
      })
  };

  useEffect(() => {
    // get the data from the server!
    if (data) {
      const array = data.map((outfit, index) => (
        <Outfit key={index} outfitData={outfit} />
      ));
      setArray(array);
    }
  }, [data]);

  return (
    <div className="outfitsContainer">
      <h2>Categories</h2>
      <form onSubmit = {handleSubmit}>
          <div>
            <input 
              type="checkbox"
              id="casual"
              value="casual"
              name="categories"
              checked={categories.casual}
              onChange={handleCheckChange}
            />
            <label htmlFor="casual">Casual</label>
          </div>

          <div>
            <input 
              type="checkbox"
              id="smartCasual"
              value="smartCasual"
              name="categories"
              checked={categories.smartCasual}
              onChange={handleCheckChange}
            />
            <label htmlFor="smartCasual">Smart Casual</label>
          </div>

          <div>
            <input 
              type="checkbox"
              id="businessAttire"
              value="businessAttire"
              name="categories"
              checked={categories.businessAttire}
              onChange={handleCheckChange}
            />
            <label htmlFor="businessAttire">Business Attire</label>
          </div>

          <div>
            <input 
              type="checkbox"
              id="formal"
              value="formal"
              name="categories"
              checked={categories.formal}
              onChange={handleCheckChange}
            />
            <label htmlFor="formal">Formal</label>
          </div>

          <div>
            <input 
              type="checkbox"
              id="athleisure"
              value="athleisure"
              name="categories"
              checked={categories.athleisure}
              onChange={handleCheckChange}
            />
            <label htmlFor="athleisure">Athleisure</label>
          </div>
      </form>
      <div id="outfitBox">{array}</div>
    </div>
  );
};

export default AllOutfits;
