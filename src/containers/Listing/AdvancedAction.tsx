import { Button } from "@/styles/01_components/Button";
import { Input } from "@/styles/01_components/Input";
import { ActionContainer } from "@/styles/02_containers/AdvancedAction";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function AdvancedAction() {
  return (
    <ActionContainer>
      <Link to="/create">
        <Button>
          <FontAwesomeIcon icon={faPlus} /> Create
        </Button>
      </Link>
      <div className="search">
        <Input v-model="quickSearch" placeholder="Search by name" />
        <Button className="rounded__right">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    </ActionContainer>
  );
}
