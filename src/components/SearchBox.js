import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../images/search-icon.svg";
import { useDebounce } from "../hooks/useDebounce";
import { COLORS, BORDER } from "./Theme";

const StyledInput = styled.input`
  border: ${BORDER.THICKNESS} solid ${COLORS.GREY_300};
  transition: all 0.2s;
  height: 3.6rem;
  width: 18rem;
  padding-left: 3.5rem;

  &:hover,
  &:focus {
    cursor: pointer;
  }

  &:focus {
    outline: ${BORDER.FOCUS};
  }
`;

const StyledLabel = styled.label`
  position: relative;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 0.6rem;
  left: 0.7rem;
  cursor: pointer;
`;

const SearchBox = ({ setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
       setSearchQuery(debouncedSearchTerm);
      } else {
        setSearchQuery("");
      }
    },
    [debouncedSearchTerm, setSearchQuery]
  );

  return (
    <StyledLabel htmlFor="search">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInput
        type="text"
        placeholder="Search for a movie"
        id="search"
        name="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </StyledLabel>
  );
};

export default SearchBox;
