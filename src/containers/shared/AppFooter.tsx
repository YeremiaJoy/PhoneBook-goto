import { Footer } from "@/styles/02_containers/Layout";

export default function AppFooter() {
  return (
    <Footer>
      <span>
        Phone Book - Goto Recruitement Challenge © {new Date().getFullYear()}
        <span className="separator" />
        built by Yeremia Joy Yobel T.
      </span>
    </Footer>
  );
}
