import React, { useState, useEffect } from 'react';
import Outfit from './Outfit.jsx';
import '../styles/style.css';

const AllOutfits = ({ SSID }) => {
  const [data, setData] = useState([]);
  const [outfitsArray, setOutfitsArray] = useState([]);
  const [categories, setCategories] = useState({
    casual: false,
    smartCasual: false,
    businessAttire: false,
    formal: false,
    athleisure: false,
  });

  useEffect(() => {
    // initial fetching of all outfit data
    const fetchData = () => {
      fetch(`/outfits/alloutfits`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/JSON',
        },
        body: JSON.stringify({
          SSID: SSID,
        }),
      })
        .then((initialRes) => initialRes.json())
        .then((initialData) => setData(initialData.rows))
        .catch((error) => {
          console.error('Error fetching initial data:', error);
        });
    };
  
    fetchData();
  }, []);  

  // update array that stores outfit data when data changes 
  useEffect(() => {
    setOutfitsArray(data.map((outfit, index) => <Outfit key={outfit.index} outfitData={outfit} />));
  }, [data]);

  // function to handle updating of checkboxes
  const handleCheckChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'categories') {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [value]: checked,
      }));
    }
  };

  // filter the keys of the categories so we only send the selected categories
  const selectedCategories = Object.keys(categories).filter((key) => categories[key]);

  // function to handle the filtered outfit form submission
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
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        console.log('Filtered outfits from frontend:', res.rows);
        setData(res.rows);
      })
      .catch((error) => {
        console.log('An error occurred while getting the outfits data', error);
      });
  };

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
          <button type="submit">Get Results</button>
      </form>
      <div id="outfitBox">{outfitsArray}</div>
    </div>
  );
};

export default AllOutfits;