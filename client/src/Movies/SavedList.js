import React from 'react';
import {Link} from 'react-router-dom';

export default function SavedList(props) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.saved.map(movie => (
        <div key={movie.id}>
        <span className="saved-movie">{movie.title}</span><br/><button onClick={(e)=>{
          e.preventDefault()
            const newMovies = props.saved.filter(m=>m.id != movie.id)
            props.setSaved([...newMovies])
        }}>Unsave</button></div>
      ))}
      <Link to="/" className="home-button">Home</Link>
    </div>
  );
}
