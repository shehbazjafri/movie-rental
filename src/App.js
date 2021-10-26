import React, { useState } from "react";
import styled from "styled-components";
import "normalize.css";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typography";
import MovieGrid from "./components/MovieGrid";
import SearchInput from "./components/SearchInput";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledHeader = styled.header`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

const StyledHeaderItems = styled.div`
  display: flex;
  align-items: center;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState([]);

  const getMovies = async (searchValue) => {
    const apiUrl = `http://www.omdbapi.com/?s=${searchValue}&apikey=87b6f88e`;

    if (searchValue === "") {
      return;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSearch = (value) => {
    getMovies(value);
  };

  const handleAddToCart = (movie) => {
    // add movie to cart if not already in cart
    if (!cart.find((m) => m.imdbID === movie.imdbID)) {
      setCart([...cart, movie]);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Typography />
      <StyledHeader>
        <h1>Movies</h1>
        <StyledHeaderItems>
          <SearchInput
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <Badge color="secondary" badgeContent={cart.length}>
            <ShoppingCartIcon
              style={{
                marginLeft: "2rem",
                fontSize: "3rem",
              }}
            />
          </Badge>
        </StyledHeaderItems>
      </StyledHeader>
      <MovieGrid movies={movies} addToCart={handleAddToCart} />
    </>
  );
}

export default App;
