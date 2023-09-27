"use client";

import styled from "@emotion/styled";

export const Footer = styled.footer`
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  span {
    color: var(--white);
    font-size: 12px;
    @media screen and (max-width: 620px) {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .separator {
      margin: 0 10px;
      border-left: 1px solid var(--border-color);
      @media screen and (max-width: 620px) {
        white-space: pre;
        border: none;
      }
    }
  }
`;

export const Header = styled.header`
  background-color: var(--white);
  box-shadow: rgba(49, 53, 59, 0.12) 0px 2px 6px 0px;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  height: 60px;
  z-index: 100;
`;
export const HeaderLogo = styled.img`
  object-fit: contain;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
export const Content = styled.div`
  background-color: var(--white);
  width: 100%;
  max-width: 960px;
  word-break: break-all;
  margin: 0px auto;
  padding: 1em 16px 70px;
  min-width: 300px;
  min-height: calc(100vh - 60px - 50px);
  padding: 1.25rem;
  position: relative;
`;
