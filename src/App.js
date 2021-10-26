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

const USER_NAME = process.env.REACT_APP_USER_NAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;
const API_KEY = process.env.REACT_APP_API_KEY;

const StyledHeader = styled.header`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StyledHeaderItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLogoutButton = styled(Button)`
  &.MuiButton-outlined {
    border: 1.5px solid var(--darkgrey);
    height: 4rem;
    color: var(--white);
  }
  &.MuiButton-outlined:hover {
    border: 1.5px solid var(--darkgrey);
  }
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  useEffect(() => {
    const getLoginStatus = () => {
      // get login status from local storage
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        setIsLoggedIn(JSON.parse(isLoggedIn));
        // get cart from local storage
        const cart = localStorage.getItem("cart");
        if (cart) {
          setCart(JSON.parse(cart));
        }
      }
    };
    getLoginStatus();
  }, []);

  const getMovies = async (searchValue) => {
    try {
      const apiUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;

      if (searchValue === "") {
        return;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error(error);
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
