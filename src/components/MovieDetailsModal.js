import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function MovieDetailsModal({ open, onClose, movie, addToCart }) {
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieDetails = async (movie) => {
    const apiUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setMovieDetails(data);
  };

  useEffect(() => {
    getMovieDetails(movie);
  }, [movie]);

  const renderMovieDetails = () => {
    if (!movieDetails) {
      return (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" width={510} height={318} />
        </Stack>
      );
    }

    return (
      <>
        <DialogTitle id="alert-dialog-title">
          <h2>{movieDetails["Title"]}</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Actors:</h3>
            <p>{movieDetails["Actors"]}</p>
            <h3>Director:</h3>
            <p>{movieDetails["Director"]}</p>
            <h3>Genre:</h3>
            <p>{movieDetails["Genre"]}</p>
            <h3>Plot:</h3>
            <p>{movieDetails["Plot"]}</p>
            <h3>Released:</h3>
            <p>{movieDetails["Released"]}</p>
            <h3>Runtime:</h3>
            <p>{movieDetails["Runtime"]}</p>
          </DialogContentText>
        </DialogContent>
      </>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {renderMovieDetails()}
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
            style={{
              backgroundColor: "var(--lightblue)",
              color: "var(--white)",
              fontSize: "1rem",
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              addToCart(movie);
              onClose();
            }}
            color="primary"
            autoFocus
            style={{
              backgroundColor: "var(--lightgreen)",
              color: "var(--white)",
              fontSize: "1rem",
            }}
          >
            Add to Cart
            <AddShoppingCartIcon
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.5rem",
              }}
            />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MovieDetailsModal;
