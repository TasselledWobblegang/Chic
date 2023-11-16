import React, { useState } from 'react';

// AXIOS: REQUESTS TO SERVER
import axios from 'axios';

//were going to have to add the form input for the tags here 
//were going to have to look into the Axios what its doing here 


const UploadOutfit = ({ SSID }) => {
  // STATE: IMAGE
  const [file, setFile] = useState(undefined);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  // checkboxes!
  const [categories, setCategories] = useState({
    casual: false,
    smartCasual: false,
    businessAttire: false,
    formal: false,
    athleisure: false,
  });

  const [imagePath, setImagePath] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  // SEND IMAGE AS FORM DATA
  async function postImage({ image, description, SSID, categories }) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('SSID', SSID);
    formData.append('casual', categories.casual);
    formData.append('smart-casual', categories.smartCasual);
    formData.append('business-attire', categories.businessAttire);
    formData.append('formal', categories.formal);
    formData.append('athleisure', categories.athleisure);

    const result = await axios.post('/outfits/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return result.data;
  }

  // SUBMIT IMAGE BUTTON
  const submitImage = async (e) => {
    e.preventDefault();
    const result = await postImage({ image: file, description, SSID, categories });
    console.log('Result after submiting image: ', result);

    // setImages([result.image, ...images]);
    setImagePath(result.imagePath);
    setImageDescription(result.description);
  };

  // SELECT FILE HANDLER
  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  // checkboxes!
  const handleCheckChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'categories') {
      setCategories(
        { ...categories, [value]: checked },
      )
    }
  }

  return (
    <>
      <div
        className="uploadOutfitBox"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 className='header'>UPLOAD OUTFIT</h1>

        {/* FOR TESTING PURPOSES: UPLOADING AN IMAGE */}
        <form className='uploadForm' onSubmit={submitImage}>
          
          <div className='chooseFile'>
          <input  
          onChange={fileSelected} 
          type="file" accept="image/*" />
          </div>
          <input className='uploadInput'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description..."
          />
         

          <div className='checkboxDiv'>
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

            <div >
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
          </div>

          <input className='uploadButton' type="submit" value={'UPLOAD IMAGE'}
          />
        </form>

        {imagePath && (
          <div
            className='yourUpload'
          >
            <img
              className='uploadImg' src={imagePath} alt="this was the uploaded picture"
            />
            <p>{imageDescription}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadOutfit;
