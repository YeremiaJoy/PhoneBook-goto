import { useState, useContext } from "react";
import { Button } from "@/styles/01_components/Button";
import { Input } from "@/styles/01_components/Field";
import { ActionContainer } from "@/styles/02_containers/AdvancedAction";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { VariablesListingContext } from "@/helpers/context";

export default function AdvancedAction({ search }: { search: Function }) {
  const { setVariables } = useContext(VariablesListingContext);

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  async function handleSearch() {
    const searchByPhoneNumber = {
      where: {
        phones: {
          number: { _ilike: `%${phoneNumber}%` },
        },
      },
    };

    await setVariables(phoneNumber ? searchByPhoneNumber : {});
    search();
  }

  return (
    <ActionContainer>
      <Link to="/create">
        <Button aria-label="Create">
          <FontAwesomeIcon icon={faPlus} /> Create
        </Button>
      </Link>
      <div className="search">
        <Input
          name="search"
          className="rounded-r"
          placeholder="Search by phone number"
          onChange={(event) => setPhoneNumber(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          className="rounded__right"
          aria-label="Search by phone number"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    </ActionContainer>
  );
}
