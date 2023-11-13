import React, { useState, useEffect } from 'react';
import OutfitCard from './OutfitCard.jsx';

const AllOutfits = () => {
  const [outfitData, setOutfitData] = useState([]);

  //remove if statement after components are connected
  if (false) {
    useEffect(() => {
      fetch('/outfits/getOutfits', {
        method: 'POST',
        headers: {
          'Content-Type' : 'Application/JSON'
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log('Response for server after requesting /outfits.getOutfits', res);
          setOutfitData(res);
        })
    }, [])
  }

  //outfitCards will be initalized to an empty array
  const outfitCards = [<OutfitCard/>];

  //interate through the outfitData of all outfit data
  // then create an array of outfitCards and populate each one with
  // data of each outfit
  for (let i = 0; i < outfitData; i++) {
    outfitCards.push(<OutfitCard/>);
  }

  return (
    <div>
      <h1>Here are all your outfits</h1>
      <div className='outfitsContainer'>
        {outfitCards}
      </div>
    </div>
  )
}

export default AllOutfits;