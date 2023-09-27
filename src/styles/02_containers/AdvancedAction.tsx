"use client";

import styled from "@emotion/styled";

export const ActionContainer = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  @media screen and (max-width: 620px) {
    grid-template-columns: auto;
    gap: 0.5rem;
    .search input {
      width: 100%;
    }
  }
  .search {
    display: flex;
    justify-content: end;
  }
`;
