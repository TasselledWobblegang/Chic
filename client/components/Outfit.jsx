import React from 'react'

const Outfit = (props) => {
    const { aws_image, description, casual, smart_casual, business_attire, formal, athleisure } = props;
    const selectedCategories = [casual, smart_casual, business_attire, formal, athleisure].filter(Boolean);

    return (
      <div id='outfit'>
        <div className='imgContainer'>
          <img src={'outfits/uploads/' + aws_image} style={{maxWidth:'300px'}}alt="outfitImage prop" />
        </div>
        <h3>{description}</h3>
        {selectedCategories && 
        <div>
          {selectedCategories.map((category, idx) => (
            <div key={idx}>
              {category}
            </div>
          ))}
        </div>
      }
      </div>
  )
}

export default Outfit;