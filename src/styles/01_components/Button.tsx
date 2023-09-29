"use client";

import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: var(--primary);
  border: none;
  border-radius: 8px;
  color: var(--white);
  height: 40px;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-dark);
  }
  &:focus {
    outline: none;
  }
  &.rounded__right {
    border-radius: 0 8px 8px 0;
  }
  &.button__light {
    background-color: var(--white);
    color: var(--text);
    border: 1px solid var(--border-color);
  }
  &.button__danger {
    background-color: var(--danger);
    color: var(--white);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
