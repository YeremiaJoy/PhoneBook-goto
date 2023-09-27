import { Header, HeaderLogo } from "@/styles/02_containers/Layout";
import logo from "@/assets/logo_header.png";

export default function AppHeader() {
  return (
    <Header>
      <a href="/">
        <HeaderLogo src={logo} alt="logo_header" width="40" height="40" />
      </a>
    </Header>
  );
}
