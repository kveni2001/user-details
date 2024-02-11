import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [users, setUsers] = useState([]);
  const [previewDisplay, setPreviewDisplay] = useState('none');
  const [activePopup, setActivePopup] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then(data => setUsers(data.data));
  }, []);

  const handleDetailClick = (user) => {
    setPreviewDisplay('flex');
    setActivePopup(user.id);
  };

  const handleCloseClick = () => {
    setActivePopup(null);
    setPreviewDisplay('none');
  };

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth / 2;
    carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth / 2; 
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="container"> 
      <h1>PROFILES</h1>
      <div className="wrapper"> 
        <i onClick={scrollLeft}><img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZ0lEQVR4nO2WMQqAQAwE5xMR/f9LrETRxit8jsdJbKwsNIK306UaWJYlIMR9GmABeoKlCdiBMUpqwOrSDWglfRLF+ypWTXsLs0uTjwW/F9sl6k7yCEyxo8J99PpMkeJTXhZuOC5RPRnBEDtxjsnsowAAAABJRU5ErkJggg==" /></i>
        <ul ref={carouselRef} className='carousel'> 
          {users.map(user => (
            <li key={user.id} className="card" onClick={() => handleDetailClick(user)}>
              <img src={user.avatar} alt={user.first_name} />
              <h2>{user.first_name}</h2>
            </li>
          ))}
        </ul>
        <i onClick={scrollRight}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAY0lEQVR4nO3WsQ2AMAxE0b+EI7L/JjRIgQoKxgEhXKUGR4F7C5x0si2DyG0EFiARrAAHsEWHG7B6+A5khUcw1Y4GLlDy43LVPn8+2Kr1GhT6JNX7KvvN9OJHocnrM7V69qRfJ2gjO3FQNAseAAAAAElFTkSuQmCC" /></i>
      </div>
      <div className="profile-preview" style={{ display: previewDisplay }}>
        {users.map(user => (
          <div key={user.id} className={`popup ${activePopup === user.id ? 'active' : ''}`} data-target={`p${user.id}`}>
            <button type="button" className="close" aria-label="Close" onClick={handleCloseClick}>
              <span aria-hidden="true">&times;</span>
            </button>
            <img src={user.avatar} alt={user.first_name} />
            <div className="details" data-target={`p${user.id}`}>
              <h2>{user.first_name} {user.last_name}</h2>
              <FontAwesomeIcon className='mail' icon={faEnvelope} style={{ display: "inline" }} />
              <h5 style={{ display: "inline" }}>{user.email}</h5>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus tempora fugiat magni necessitatibus, quibusdam corporis. Animi amet laborum asperiores optio, doloremque sed, similique soluta corporis dolore, numquam laudantium corrupti reprehenderit.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
