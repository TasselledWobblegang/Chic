import React, { useState } from 'react';

import axios from 'axios';

const Home = () => {
  // TEST STATE: IMAGE
  const [file, setFile] = useState(undefined);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  // TEST: UPLOADING IMAGE
  async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    const result = await axios.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return result.data;
  }

  const submitImage = async (e) => {
    e.preventDefault();
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  };

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <h1>Home Page</h1>

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
    </>
  );
};

export default Home;
