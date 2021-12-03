import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import createClass from 'create-react-class';

const Gallery = () => {
  useEffect(() => {
    fetchPhotos()
  }, [])

  let isLiked = new Boolean(false);

  const [photos, setPhotos] = useState("");
  const [filter, setFilter] = useState(null);

  const like = (id) => {
    console.log(id);
    // if (true) {
      setPhotos(photos.map((photo) => photo.id == id ? { ...photo, like: 1 } : photo))
      isLiked = true;
      console.log("isLiked: " + isLiked + "\tmust be true");
    // }
    // else {
    //   setPhotos(photos.map((photo) => photo.id == id ? { ...photo, like: 0 } : photo))
    //   isLiked = false;
    //   console.log("isLiked: " + isLiked + "\tmust be false");
    // }
  }

  const fetchPhotos = async () => {
    const Photos = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    setPhotos(Photos.data.map((photo) => ({ ...photo, like: 0 })))
  }
  console.log(photos)

  const deletePhoto = (id, i) => {
    const confirm = window.confirm("Вы уверены?")
    if (confirm) {
      setPhotos(photos.filter((photos) => photos.id !== id))
    }
  }

  return (
    <div className="container">
      <h3>Gallery</h3>
      <div className="row">
        {photos && photos.map((photo, i) =>
          <div className="col s4">
            <div className="photo-box">
              <div className="photo-img">
                <img src={photo.url} key={photo.id} alt="" />
              </div>
              <div className="like-section">
                <div className="like-btn-side">
                  <i id="like-btn" className="material-icons prefix select-btn none"
                    onClick={() => like(photo.id)}>
                    thumb_up
                  </i>
                  <div className="like-counter">
                    <p>{photo.like}</p>
                  </div>
                </div>
                <div className="delete-photo">
                  <button className="waves-effect waves-light btn" onClick={() => deletePhoto(photo.id, i)}>Удалить</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery;
