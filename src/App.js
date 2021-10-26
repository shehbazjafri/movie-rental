import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "normalize.css";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typography";
import MovieGrid from "./components/MovieGrid";
import SearchInput from "./components/SearchInput";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
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
  gap: 2rem;
`;

const StyledLogoutButton = styled(Button)`
  &.MuiButton-outlined {
    border: 1.5px solid darkgray;
    height: 4rem;
    color: white;
  }
  &.MuiButton-outlined:hover {
    border: 1.5px solid darkgray;
  }
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const getCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  };

  const getLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsLoggedIn(JSON.parse(isLoggedIn));
      // get cart from local storage
      getCart();
    }
  };

  useEffect(() => {
    // get login status from local storage
    getLoginStatus();
  }, []);

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

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
      const newCart = [...cart, movie];
      setCart(newCart);
      saveCartToLocalStorage(newCart);
    }
  };

  const handleLogin = (username, password) => {
    if (username === USER_NAME && password === PASSWORD) {
      setIsLoggedIn(true);
      // save to local storage
      localStorage.setItem("isLoggedIn", true);
    } else {
      setLoginErrorMessage("Invalid credentials");
    }
  };

  const handleLogout = () => {
    // clear local storage and state
    localStorage.clear();
    setCart([]);
    setMovies([]);
    setSearchValue("");
    setIsLoggedIn(false);
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
                fontSize: "3rem",
              }}
            />
          </Badge>
          <StyledLogoutButton variant="outlined" onClick={handleLogout}>
            {isLoggedIn ? "Logout" : "Login"}
          </StyledLogoutButton>
        </StyledHeaderItems>
      </StyledHeader>
      <MovieGrid movies={movies} addToCart={handleAddToCart} />
      {!isLoggedIn && (
        <LoginModal
          show={!isLoggedIn}
          onLogin={handleLogin}
          error={loginErrorMessage}
        />
      )}
    </>
  );
}

export default App;
