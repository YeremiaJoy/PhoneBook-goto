import React from "react";
import { Content } from "@/styles/02_containers/Layout";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface IProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: IProps) {
  return (
    <main>
      <AppHeader />
      <Content>{children}</Content>
      <AppFooter />
    </main>
  );
}
