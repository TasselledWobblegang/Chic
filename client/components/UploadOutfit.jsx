import React, { useState } from 'react';

// AXIOS: REQUESTS TO SERVER
import axios from 'axios';

const UploadOutfit = () => {
  // STATE: IMAGE
  const [file, setFile] = useState(undefined);
  const [description, setDescription] = useState('');
  // const [images, setImages] = useState([]);

  const [imagePath, setImagePath] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  // SEND IMAGE AS FORM DATA
  async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    const result = await axios.post('/outfits/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return result.data;
  }

  // SUBMIT IMAGE BUTTON
  const submitImage = async (e) => {
    e.preventDefault();
    const result = await postImage({ image: file, description });
    console.log('Result after submiting image: ', result);

    setImagePath(result.imagePath);

    // setImages([result.image, ...images]);
    setImageDescription(result.description);
  };

  // SELECT FILE HANDLER
  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

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
        <h1>Upload Outfit</h1>

        {/* FOR TESTING PURPOSES: UPLOADING AN IMAGE */}
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50vw',
            margin: 'auto',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            border: 'solid 2px black',
            height: '30vh',
          }}
          onSubmit={submitImage}
        >
          <input onChange={fileSelected} type="file" accept="image/*" />
          <input
            style={{ height: '25px', width: '80%', paddingLeft: '10px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description..."
          />
          <input
            style={{ height: '40px', width: '200px' }}
            type="submit"
            value={'Upload Image'}
          />
        </form>

        <div
          className="yourUpload"
          style={{
            border: 'solid 1px black',
            padding: '10px',
            marginTop: '20px',
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            style={{ width: '300px', height: '300px' }}
            src={'2d13d4987bf77f02ea051c3d74aa67eb'}
            alt=""
          />
          <p>{imageDescription}</p>
        </div>
      </div>
    </>
  );
};

export default UploadOutfit;
