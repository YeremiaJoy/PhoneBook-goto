"use client";

import styled from "@emotion/styled";

export const DuplicableWrapperContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  label {
    font-weight: 500;
    font-size: 14px;
  }
`;
export const DuplicableInputContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  input {
    width: 100%;
  }
  .field {
    display: flex;
    gap: 0.5rem;
  }
`;
export const RemoveButtonContainer = styled.div`
  text-align: end;
`;
