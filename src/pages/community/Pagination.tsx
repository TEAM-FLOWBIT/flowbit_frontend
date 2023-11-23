import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.nav`
  display: flex;
  gap: 5rem;
  & > svg {
    width: 3rem;
    height: 3rem;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}: PaginationProps) {
  const previousPageStyle =
    currentPage === 1
      ? { stroke: "#48519B", cursor: "default" }
      : { stroke: "white", cursor: "pointer" };
  const nextPageStyle =
    currentPage === totalPages
      ? { stroke: "#48519B", cursor: "default" }
      : { stroke: "white", cursor: "pointer" };

  return (
    <PaginationWrapper>
      <svg
        viewBox="0 0 30 30"
        fill="none"
        style={previousPageStyle}
        onClick={goToPreviousPage}
      >
        <path
          d="M22.5 7.5L7.5 14.7222L22.5 22.5"
          stroke-width="2"
          stroke-linecap="square"
        />
      </svg>
      <svg
        viewBox="0 0 30 30"
        fill="none"
        style={nextPageStyle}
        onClick={goToNextPage}
      >
        <path
          d="M7.5 7.5L22.5 14.7222L7.5 22.5"
          stroke-width="2"
          stroke-linecap="square"
        />
      </svg>
    </PaginationWrapper>
  );
}
