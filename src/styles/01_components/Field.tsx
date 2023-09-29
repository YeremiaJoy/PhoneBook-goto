"use client";

import styled from "@emotion/styled";

export const InputFieldContainer = styled.div`
  display: grid;
  gap: 0.25rem;
  label {
    font-weight: 500;
    font-size: 14px;
  }
`;
export const MessageDanger = styled.span`
  font-size: 12px;
  color: var(--danger);
`;
export const Input = styled.input`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0 1rem;
  height: 40px;
  &:focus {
    outline: none;
  }
  &.rounded-r {
    border-radius: 8px 0 0 8px;
  }
  &:disabled {
    cursor: no-drop;
  }
`;
