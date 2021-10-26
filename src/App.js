import React, { useState } from "react";
import styled from "styled-components";
import "normalize.css";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typography";
import MovieGrid from "./components/MovieGrid";
import SearchInput from "./components/SearchInput";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginModal from "./components/LoginModal";

const USER_NAME = process.env.USER_NAME || "admin";
const PASSWORD = process.env.PASSWORD || "admin_12345";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  console.log(process.env.API_KEY);
  console.log(process.env.USER_NAME);

  const getMovies = async (searchValue) => {
    const apiUrl = `http://www.omdbapi.com/?s=${searchValue}&apikey=87b6f88e`;

    if (searchValue === "") {
      return;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

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

  const handleLogin = (username, password) => {
    if (username === USER_NAME && password === PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setLoginErrorMessage("Invalid credentials");
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
      <LoginModal
        show={!isLoggedIn}
        onLogin={handleLogin}
        error={loginErrorMessage}
      />
    </>
  );
}

export default App;
