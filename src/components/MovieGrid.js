import React from "react";
import styled from "styled-components";

const StyledMovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  gap: 1rem;
  margin: 1rem;
`;

function MovieGrid({ movies }) {
  return (
    <StyledMovieGrid>
      {movies.map((movie, index) => (
        <div key={`${movie.imdbID}-${index}`}>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </StyledMovieGrid>
  );
}

export default MovieGrid;
