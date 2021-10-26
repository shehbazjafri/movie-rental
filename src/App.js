import React, { useState } from "react";
import styled from "styled-components";
import "normalize.css";
import GlobalStyles from "./styles/GlobalStyles";
import Typography from "./styles/Typography";
import MovieGrid from "./components/MovieGrid";
import SearchInput from "./components/SearchInput";

const StyledHeader = styled.header`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  return (
    <>
      <GlobalStyles />
      <Typography />
      <StyledHeader>
        <h1>Movies</h1>
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </StyledHeader>
      <MovieGrid movies={movies} />
    </>
  );
}

export default App;
