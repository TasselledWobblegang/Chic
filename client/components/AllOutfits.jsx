import React, { useState, useEffect } from 'react';
import Outfit from './Outfit.jsx'

const AllOutfits = ({SSID}) => {

    const [outfitImage, setOutfitImage] = useState([])
    const [outfitDes, setOutfitDes] = useState([]);
    
    useEffect(() => {
        fetch(`/outfits/alloutfits`, {
            method: 'POST',
            headers: {
                'Content-type' : 'Application/JSON'
            },
            body: JSON.stringify({
               SSID: SSID
            }),
        })
        .then((res) => res.json())
        .then((res) => {
        console.log('these are all outfits from frontend', res.rows);
        const outfitImageArr = [];
        const outfitDesArr = [];
        for (let i = 0; i < res.rows.length; i++) {
            outfitImageArr.push(res.rows[i]['aws_image']);
            outfitDesArr.push(res.rows[i]['description']);
        };
        setOutfitImage(outfitImageArr);
        setOutfitDes(outfitDesArr);
        })
    }, [])
  // add image and description to outfitdata

    console.log('outfitImage:',outfitImage);
    console.log('outfitDes:', outfitDes);

    const array = [];
    for (let i = 0; i < outfitImage.length; i++) {
        array.push(<Outfit outfitImage={outfitImage[i]} outfitDes={outfitDes[i]}/>)
    };
    
    return(
        <>
            <div id='outfitBox'>
                {array}
            </div>
        </>
    )
}

export default AllOutfits;