import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MovieDetailsModal from "./MovieDetailsModal";

const StyledMovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  gap: 1rem;
  margin: 1rem;
`;

const StyledMovieGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  position: relative;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    div {
      opacity: 1;
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.5s ease;
  color: #fff;
`;

function MovieGrid({ movies, addToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <StyledMovieGrid>
      {movies.map((movie, index) => (
        <StyledMovieGridItem
          key={`${movie.imdbID}-${index}`}
          onClick={() => handleMovieClick(movie)}
        >
          <img src={movie.Poster} alt={movie.Title} />
          <StyledButtonContainer>
            <IconButton
              aria-label="add to shopping cart"
              style={{
                color: "#fff",
              }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(movie);
              }}
            >
              Add to Cart
              <AddShoppingCartIcon
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </StyledButtonContainer>
        </StyledMovieGridItem>
      ))}
      {showModal && (
        <MovieDetailsModal
          open={showModal}
          onClose={handleCloseModal}
          movie={selectedMovie}
          addToCart={addToCart}
        />
      )}
    </StyledMovieGrid>
  );
}

export default MovieGrid;
