import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  useEffect(() => {
    fetchPhotos()
  }, [])

  const [photos, setPhotos] = useState("");
  const [filter, setFilter] = useState(null);
  const likedPhotos = [];

  const like = (id) => {
    setPhotos(photos.map((photo) => photo.id === id ? { ...photo, like: 1 } : photo)) 
  }

  const fetchPhotos = async () => {
    const Photos = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    setPhotos(Photos.data.map((photo) => ({ ...photo, like: 0 })))
  }

  const deletePhoto = (id, i) => {
    const confirm = window.confirm("Вы действительно хотите это удалить?")
    if (confirm) {
      setPhotos(photos.filter((photos) => photos.id !== id))
    }
  }

  return (
    <div className="container">
      <h3>Gallery</h3>
      <div className="row">
        {photos && photos.map((photo, i) =>
          <div className="col s3">
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
