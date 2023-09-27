import { useState } from "react";
import { Button } from "@/styles/01_components/Button";
import { Input } from "@/styles/01_components/Input";
import { ActionContainer } from "@/styles/02_containers/AdvancedAction";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function AdvancedAction({
  search,
  setVariables,
}: {
  search: Function;
  setVariables: Function;
}) {
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
        <Button>
          <FontAwesomeIcon icon={faPlus} /> Create
        </Button>
      </Link>
      <div className="search">
        <Input
          name="search"
          placeholder="Search by phone number"
          onChange={(event) => setPhoneNumber(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button className="rounded__right" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    </ActionContainer>
  );
}
