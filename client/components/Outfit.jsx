import React from 'react'

const Outfit = ({ outfitImage, outfitDes }) => {
    return(
        <div id='outfit'>
          <div className='imgContainer'>
            <img src={'outfits/uploads/' + outfitImage} style={{maxWidth:'300px'}}alt="outfitImage prop" />
          </div>
          <h3>{outfitDes}</h3>
        </div>
       )
}

export default Outfit;