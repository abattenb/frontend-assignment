import styled from "styled-components";
import { COLORS, BORDER } from "./Theme";

const NoMoviesContainer = styled.div`
  display: grid;
  place-content: center;
  height: 50vh;
  width: 100%;
  font-size: 2rem;
  border-radius: ${BORDER.RADIUS};
  color: ${COLORS.GREY_800};
  border: ${BORDER.THICKNESS} solid ${COLORS.GREY_300};
`;

const NoMovies = () => {
  return <NoMoviesContainer>
    No movies found, try another search!
  </NoMoviesContainer>
};

export default NoMovies;
