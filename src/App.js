import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "normalize.css";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typography";
import Header from "./components/Header";

const StyledMovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  gap: 1rem;
  margin: 1rem;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const apiUrl = `http://www.omdbapi.com/?s=Guardians&apikey=87b6f88e`;

  const getMovies = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header />
      <StyledMovieGrid>
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </StyledMovieGrid>
    </>
  );
}

export default App;
