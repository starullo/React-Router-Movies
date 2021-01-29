import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function Movie(props) {
  const [movie, setMovie] = useState(null);
console.log(props.saved)
  const {id} = useParams();
  console.log(id)
  // Change ^^^ that line and use a hook to obtain the :id parameter from the URL

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`) // Study this endpoint with Postman
      .then(response => {
        console.log(response)
        setMovie(response.data)
        // Study this response with a breakpoint or log statements
        // and set the response data as the 'movie' slice of state
      })
      .catch(error => {
        console.error(error);
      });
    // This effect should run every time time
    // the `id` changes... How could we do this?
  }, [id]);

  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = evt => { }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div onClick={(e)=>{
        e.preventDefault();
        if (props.saved && props.saved.some(m=>m.id == id)) {
          let newMovies = props.saved.filter(m=>{
            console.log(m.id, id)
            return m.id != id})
          props.setSaved([...newMovies])
        } else {
          props.setSaved([...props.saved, movie])
        }
      }}className="save-button">{props.saved.some(m=>m.id == id) ? "Unsave" : "Save"}</div>
    </div>
  );
}
