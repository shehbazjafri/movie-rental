import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const StyledTextField = styled(TextField)`
  width: 30rem;
  border-radius: 20px;
  color: var(--white);
  .MuiFormControl-root {
    border: 1.5px solid var(--grey);
    border-radius: 10px;
    color: var(--white);
  }
  .MuiInputLabel-root {
    color: var(--grey);
  }
  & .MuiOutlinedInput-root {
    border-radius: 20px;
    border-color: var(--white);
    color: var(--white);

    fieldset {
      border-color: var(--white);
    }
    &.Mui-focused fieldset {
      border-color: var(--white);
    }
  }
`;

function SearchInput({ onChange, value, onSearch }) {
  return (
    <div>
      <StyledTextField
        label="Search for movies..."
        type="search"
        variant="outlined"
        onChange={onChange}
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                color="primary"
                aria-label="search"
                onClick={() => onSearch(value)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default SearchInput;
