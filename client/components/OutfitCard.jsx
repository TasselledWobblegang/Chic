import React from "react";

const OutfitCard = ({outfitData}) => {
  return (
    <article className='outfitCard'>
    <div className='imgContainer'>
      <img className='outfitImg' src='' alt="outfitData.aws_key" />
    </div>
    <div>
      <p>description</p>
    </div>
  </article>
  )
}

export default OutfitCard;