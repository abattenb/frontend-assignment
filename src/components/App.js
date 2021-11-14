import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchBox from "./SearchBox";
import PosterContainer from "./PosterContainer";
import NoMovies from "./NoMovies";

import logo from "../images/logo.svg";
import { COLORS, BORDER } from "./Theme";


const SearchHeader = styled.div`
  display: flex;
  border-bottom: ${BORDER.THICKNESS} solid ${COLORS.GREY_300};
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`;

const Logo = styled.img`
  width: 13.6rem;
  margin-right: auto;
`;

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const todaysDate = new Date().toISOString().slice(0, 10);

    let url;
    if (searchQuery) {
      url = `${process.env.REACT_APP_API_DOMAIN}/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=popularity.desc&query=${searchQuery}`;
    } else {
      url = `${process.env.REACT_APP_API_DOMAIN}/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&sort_by=release_date.desc&region=US&release_date.lte=${todaysDate}&with_release_type=2`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data.results);
      })
      .catch((e) => { console.log("TODO: Log to logger.") });
  }, [searchQuery]);

  return (
    <div>
      <SearchHeader>
        <Logo src={logo} alt="Timescale" />
        <SearchBox setSearchQuery={setSearchQuery} />
      </SearchHeader>

      <h1>Most Recent Movies</h1>

      { movieList.length
        ? <PosterContainer {...{ movieList }} />
        : <NoMovies />
      }
    </div>
  );
};

export default App;
