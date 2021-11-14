import React, { useState } from 'react';
import styled from 'styled-components'

import Modal from './Modal';
import {BORDER, COLORS} from './Theme';

const StyledPosterContainer = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr) ) ;
  grid-auto-rows: 32rem;
`;

const Poster = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 2rem;
  border: ${BORDER.THICKNESS} solid ${COLORS.GREY_100};
  border-radius: ${BORDER.RADIUS};
  transition: all .2s;
  box-shadow: 0 .2rem .6rem -.1rem rgba(0,0,0,.2);
  padding: 0;
  background: transparent;

  &:hover,
  &:focus {
    cursor: pointer;
    transform: scale(1.02) translateY(-.3rem);
    box-shadow: 0 .3rem .6rem -.1rem rgba(0,0,0,.35);
  }

  &:focus {
    outline: ${BORDER.FOCUS};
  }
`;

const PosterImage = styled.div`
  position: relative;
  border-top-left-radius: ${BORDER.RADIUS};
  border-top-right-radius: ${BORDER.RADIUS};
  background: url(${props => props.url}) no-repeat center center;
  background-size: cover;
  flex: 1;
  width: 100%;
`;

const PosterImageNotFound = styled.div`
  display: grid;
  place-content: center;
  position: relative;
  border-top-left-radius: ${BORDER.RADIUS};
  border-top-right-radius: ${BORDER.RADIUS};
  background: ${COLORS.GREY_300};
  flex: 1;
  width: 100%;
  font-size: 1.2rem;
`;

const PosterTitle = styled.div`
  text-align: center;
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
`;

const PosterScore = styled.div`
  position: absolute;
  top: 1.3rem;
  left: 1.3rem;
  width: 3.4rem;
  height: 3.4rem;
  line-height: 3.4rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: ${COLORS.WHITE};
  border-radius: 99rem;
  border: ${BORDER.THICKNESS} solid ${COLORS.BLACK};
  text-align: center;
`;

const PosterContainer = ({movieList}) => {
  const [modalData, setModalData] = useState(undefined);

  return <StyledPosterContainer>
    <Modal modalData={modalData} setModalData={setModalData} />

    { movieList.map((movie) => {
        return (
          <Poster key={movie.id} onClick={() => setModalData(movie)}>
            { movie.poster_path ?
              <PosterImage url={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              :
              <PosterImageNotFound><div>🎥 Poster Not Found 🚫</div></PosterImageNotFound>
            }
            <PosterTitle>{movie.title}</PosterTitle>
            <PosterScore>{movie.vote_average}</PosterScore>
          </Poster>
        );
      })}
  </StyledPosterContainer>;
};

export default PosterContainer;
