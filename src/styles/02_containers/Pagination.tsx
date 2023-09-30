"use client";

import styled from "@emotion/styled";

export const PaginationWrapper = styled.section`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;

  @media screen and (max-width: 620px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const PageOptionContainer = styled.ul`
  display: flex;
  gap: 0.5rem;
`;
export const PageOption = styled.li`
  text-decoration: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.active {
    color: var(--white);
    background-color: var(--primary);
  }
  &:hover {
    color: var(--white);
    background-color: var(--primary);
  }
`;
export const PageShow = styled.span`
  padding-left: 0.5rem;
  border-left: 1px solid var(--border-color);

  @media screen and (max-width: 620px) {
    border: none;
  }
`;
