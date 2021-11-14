import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { COLORS } from "./Theme";
import { ReactComponent as CloseButtonIcon } from "../images/close-icon.svg";

const ModalContainer = styled.div`
  position: fixed;
  display: grid;
  place-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  z-index: 0;
`;

const StyledModal = styled.div`
  position: relative;
  width: 100%;
  max-width: 58rem;
  background: ${COLORS.WHITE};
  padding: 2rem;
  font-size: 1.4rem;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const CloseButton = styled.button`
  display: grid;
  place-content: center;
  float: right;
  margin-left: auto;
  width: 2.3rem;
  height: 2.3rem;
  padding: 0;
  border: none;
  background: transparent;
`;

const ModelContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 2rem;
`;

const Bold = styled.span`
  font-weight: 700;
`;

const Modal = ({ modalData, setModalData }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));

  // ESC key to close the modal
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setModalData(undefined);
    });
    return () => document.removeEventListener("keydown", (e) => e);
  }, [modalData, setModalData]);

  return (
    <React.Fragment>
      {modalData &&
        createPortal(
          <ModalContainer data-testid="Modal">
            {/* Click to dismiss, but still allows text selection without JS trapping */}
            <ModalBackdrop onClick={() => setModalData(undefined)} />
            <StyledModal>
              <ModalHeader>
                <CloseButton
                  onClick={() => setModalData(undefined)}
                  data-testid="Modal-close"
                >
                  <CloseButtonIcon />
                </CloseButton>
                {modalData.title}
              </ModalHeader>

              <ModelContent>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${modalData.poster_path}`}
                    alt={`${modalData.title} poster`}
                  />
                </div>
                <div>
                  <div>
                    <Bold>Release Date: </Bold>
                    {formatDate(modalData.release_date)}
                    <br />
                    <br />
                    {modalData.overview}
                    <br />
                    <br />
                    <Bold>{modalData.vote_average}</Bold> / 10 (
                    {modalData.vote_count} total votes)
                  </div>
                </div>
              </ModelContent>
            </StyledModal>
          </ModalContainer>,
          document.body
        )}
    </React.Fragment>
  );
};

export default Modal;
