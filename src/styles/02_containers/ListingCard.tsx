"use client";

import styled from "@emotion/styled";

export const ListingCardContainer = styled.section`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .created-at {
    opacity: 0.8;
    font-size: 12px;
    color: var(--grey);
  }
`;
export const UserName = styled.div`
  display: flex;
  align-items: center;
  .favorite {
    margin-right: 4px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: var(--yellow);
    }
  }
`;
export const ContactContainer = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  gap: 0.5rem;
`;
export const BubbleContact = styled.div`
  font-size: 14px;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 1px solid #efefef;
  border-radius: 50px;
`;
export const ListingAction = styled.div`
  display: grid;
  grid-template-columns: auto 20px;
  .action {
    svg {
      cursor: pointer;
      &:first-of-type {
        font-size: 14px;
      }
    }
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
